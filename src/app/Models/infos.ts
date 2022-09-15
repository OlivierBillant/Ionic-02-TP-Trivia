export class Infos {
    pseudo: string;
    difficulty: string;
    score: number;
  
    constructor(
        pseudo: string,
        difficulty: string,
        score: number
    ) {
      this.pseudo = pseudo;
      this.difficulty = difficulty;
      this.score = score;
    }
  }
