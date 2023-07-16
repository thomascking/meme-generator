import { Component } from '@angular/core';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-meme-generator',
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.scss']
})
export class MemeGeneratorComponent {
  prompt: string = '';
  currentMeme: any;

  constructor(
    private memeService: MemeService,
  ) { }

  generateMeme() {
    this.memeService.generate(this.prompt).subscribe((data) => {
      console.log(data);
      this.currentMeme = data;
    })
  }
}
