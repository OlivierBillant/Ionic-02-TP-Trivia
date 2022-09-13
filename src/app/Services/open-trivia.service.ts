import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  constructor() { }

  getQuestions(difficulte: string){
    return new Promise((resolve, reject) => {
      resolve(Math.floor(Math.random() * 100));
      reject(-1);
    })
  }
}
