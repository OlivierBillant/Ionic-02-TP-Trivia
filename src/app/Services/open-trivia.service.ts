import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpenTriviaService {
  response: any[] = [
    {
      category: 'Entertainment: Japanese Anime & Manga',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?',
      correct_answer: 'The Salamander',
      incorrect_answers: ['The Dragon Slayer', 'The Dragon', 'The Demon'],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'boolean',
      difficulty: 'medium',
      question:
        '&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz',
      correct_answer: 'False',
      incorrect_answers: ['True'],
    },
  ];

  constructor() {}

  // getQuestions() {
  //   return new Promise((resolve, reject) => {
  //     resolve(this.response);
  //     reject(-1);
  //   });
  // }

  async getQuestions(){
    return this.response;
  }
}
