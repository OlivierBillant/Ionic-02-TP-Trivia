import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  async getQuestions() {
    return this.response;
  }

  //Exemple d'appel API
baseUrl: string = "https://cataas.com";

  getCat(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + "/cat?json=true").toPromise().then((result: any) => {
        console.log(result);
        resolve(this.baseUrl + result.url);
        reject("Impossible de récupérer l'image : vérifiez votre connexion internet.");
      });
    });
  }

url: string = "https://opentdb.com/api.php?amount=5";
  getQuestionAPI(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.url).toPromise().then((questions: any) => {
        resolve(questions.results);
        reject("Impossible de récupérer les questions, something went HORRIFYINGLY wrong")
      })
    })
  }
}
