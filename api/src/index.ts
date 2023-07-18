import express, { Request, Response } from 'express';
import { CreateChatCompletionRequest, Configuration, OpenAIApi } from 'openai';

import dotenv from 'dotenv';

interface Meme {
  image: string;
  top: string;
  bottom: string;
  imageUrl?: string;
}

dotenv.config();

console.log(process.env.OPENAI_SECRET);

const generateChatConfig = (prompt: string) => ({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "Generate a meme based on the user input. Do not include text in the image description. Answer in the format Image:<image description>\nTop:<top text>\nBottom:<bottom text>."
    },
    {
      "role": "user",
      "content": prompt
    }
  ],
  temperature: 0,
  max_tokens: 64,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
}) as CreateChatCompletionRequest;

const parseResponse = (message: string) => {
  // split by line
  const lines = message.split('\n');
  console.log(lines);
  const meme: Meme = {
    image: '',
    top: '',
    bottom: '',
  };
  // loop through lines
  for (let line of lines) {
    // if it starts with "Image: ", store as image
    if (line.startsWith('Image:')) {
      meme.image = line.slice(7);
    }
    else if (line.startsWith('Top:')) {
      meme.top = line.slice(5);
    }
    else if (line.startsWith('Bottom:')) {
      meme.bottom = line.slice(8);
    }
    // same for top and bottom text
  }
  return meme;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET,
});
const openai = new OpenAIApi(configuration);

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('healthy');
});

app.get('/meme', async (req: Request, res: Response) => {
  console.log('generating new meme');
  const prompt = req.query['prompt'] as string;
  console.log(`prompt: ${prompt}`);
  try {
    const response = await openai.createChatCompletion(generateChatConfig(prompt));
    const message = response.data.choices[0].message?.content;
    console.log(message);
    if (message) {
      const meme = parseResponse(message);
      const imageReponse = await openai.createImage({
        prompt: meme.image,
        n: 1,
        size: "256x256",
      });
      meme.imageUrl = imageReponse.data.data[0].url!;
      res.send(meme);
    }
  } catch (e) {
    res.send(e);
  }
});

app.listen(8000, () => {
  console.log('running');
});
