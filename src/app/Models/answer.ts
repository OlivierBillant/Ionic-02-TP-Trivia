export class Answer {
  correct_answer: string;
  incorrect_answers: string[];

  constructor(
    correct_answer: string,
    incorrect_answers: string[]
  ) {
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
}
