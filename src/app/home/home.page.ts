import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Question } from '../Models/question';
import { OpenTriviaService } from '../Services/open-trivia.service';
import { RngService } from '../Services/rng.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pseudo: string = '';
  niveaux: string[] = ['facile', 'normal', 'difficile', 'extreme'];
  form_isHidden: boolean = false;
  message_isHidden: boolean = true;
  question_isHidden: boolean = true;
  suivant_isHidden: boolean = true;
  recommencer_isHidden = true;
  isDisabled: boolean = false;
  listeQuestion: Question[] = [];
  contrainte = 1;
  difficulte: string;
  intitule: string;
  numQuestion: number = 0;
  score: number = 0;
  error_length: string =
    'Votre mot de passe doit faire plus de ' + this.contrainte + ' caractères';
  reponses: string[] = ['A', 'B', 'C', 'D'];
  couleurs: string[] = ['primary', 'success', 'danger', 'warning'];
  couleur: string = this.couleurs[0];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private rngService: RngService,
    private trivia: OpenTriviaService
  ) {}

  //Au clic du commencement
  async button_commencer_click() {
    if (this.pseudo.length < this.contrainte) {
      //this.message_isHidden = false;

      const alert = await this.alertController.create({
        header: 'Erreur',
        message: this.error_length,
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      this.questionSuivante(this.numQuestion);
      this.form_isHidden = true;
      this.question_isHidden = false;
    }
  }

  //Au clic d'une réponse
  async button_reponse_click(
    position: 'top' | 'middle' | 'bottom',
    reponse: string
  ) {
    const toast = await this.toastController.create({
      message:
        this.checkAnswer(reponse) + ' réponse ! Score Total : ' + this.score,
      duration: 1500,
      position: position,
    });
    await toast.present();
    this.disableAnswers();
    this.swapColor(reponse);
    // this.suivant_isHidden = false;
    this.endGame();
  }

  //Au clic de question suivante
  async button_suivant_click() {
    this.numQuestion++;
    this.disableAnswers();
    this.questionSuivante(this.numQuestion);
    this.suivant_isHidden = true;
  }

  //Au clic pour rejouer
  button_recommencer_click() {
    this.numQuestion = 0;
    this.disableAnswers();
    this.questionSuivante(this.numQuestion);
  }

  //Recupere la liste des questions
  async getQuestionsAsync() {
    this.listeQuestion = this.trivia.getQuestions()[0];
    await this.listeQuestion;
  }

  //Recupere la question à l'index en cours
  async questionSuivante(index: number) {
    this.listeQuestion = await this.trivia.getQuestions();
    this.intitule = this.listeQuestion[index].question;
    this.populateAnswers(index);
  }

  //Genere le pool de reponse melangees
  populateAnswers(index: number) {
    this.reponses = [];
    console.log(this.listeQuestion[index].incorrect_answers);

    let listeReponseTemp: string[] = [];
    for (let ele of this.listeQuestion[index].incorrect_answers) {
      listeReponseTemp.push(ele);
    }
    let randomPosition: number = this.rngService.getInt(
      0,
      listeReponseTemp.length
    );

    console.log(this.reponses);

    listeReponseTemp.splice(
      randomPosition,
      0,
      this.listeQuestion[index].correct_answer
    );
    this.reponses = listeReponseTemp;
    console.log(this.reponses);
    console.log(this.listeQuestion[index].incorrect_answers);
  }

  //Vérivation de la réponse
  checkAnswer(reponse: string) {
    if (reponse === this.listeQuestion[this.numQuestion].correct_answer) {
      this.score++;
      return 'Bonne';
    } else {
      return 'Mauvaise';
    }
  }

  //Disactiver les réponses
  disableAnswers() {
    this.isDisabled = !this.isDisabled;
  }

  //Changer les couleurs des cases
  swapColor(reponse: string) {
    if (!this.isDisabled) {
      return (this.couleur = this.couleurs[0]);
    } else {
      if (reponse === this.listeQuestion[this.numQuestion].correct_answer) {
        return this.couleurs[1];
      } else {
        return (this.couleur = this.couleurs[2]);
      }
    }
  }

  //Vérifier s'il reste des question
  endGame() {
    if (this.numQuestion == this.listeQuestion.length - 1) {
      this.suivant_isHidden = true;
      this.recommencer_isHidden = false;
    } else {
      this.suivant_isHidden = false;
      this.recommencer_isHidden = true;
    }
  }
}
