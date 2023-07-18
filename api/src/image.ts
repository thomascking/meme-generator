import Jimp from 'jimp';

export const loadImage = async (url: string) => {
  return await Jimp.read(url);
}

export const addText = async (image: Jimp, topText: string, bottomText: string) => {
  const black = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK);
  image.print(
    black,
    0, 0,
    {
      text: topText,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    256, 256
  );

  return image;
}
