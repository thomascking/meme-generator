import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemeGeneratorComponent } from './meme-generator/meme-generator.component';

const routes: Routes = [
  {
    path: '',
    component: MemeGeneratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
