import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  constructor(
    private http: HttpClient,
  ) { }

  generate(prompt: string) {
    return this.http.get('/meme', {
      params: new HttpParams().set('prompt', prompt)
    });
  }
}
