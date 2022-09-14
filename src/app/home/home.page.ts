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
  isDisabled: boolean = false;
  listeQuestion: Question[] = [];
  contrainte = 5;
  difficulte: string;
  intitule: string;
  numQuestion: number = 0;
  score: number = 0;
  error_length: string =
    'Votre mot de passe doit faire plus de ' + this.contrainte + ' caractères';
  reponses: string[] = ['A', 'B', 'C', 'D'];
  couleurs: string[] = ['primary', 'success', 'danger', 'warning'];

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
    this.suivant_isHidden = false;
    const toast = await this.toastController.create({
      message: this.checkAnswer(reponse) + ' réponse ! Score Total : ' +this.score,
      duration: 1500,
      position: position,
    });
    await toast.present();
    this.disableAnswers();
  }
  
  //Au clic de question suivante
  async button_suivant_click(){
    this.numQuestion++;
    this.questionSuivante(this.numQuestion);
    this.suivant_isHidden = true;
  }

  //Recupere la liste des questions
  async getQuestionsAsync() {
    this.listeQuestion = this.trivia.getQuestions()[0];
    await this.listeQuestion;
  }

  //Genere le pool de reponse melangees
  populateAnswers(index: number) {
    this.reponses = [];
    let listeReponseTemp: string[] = this.listeQuestion[index].incorrect_answers;
    let randomPosition: number = this.rngService.getInt(0,listeReponseTemp.length);

    listeReponseTemp.splice(
      randomPosition, 
      0,
      this.listeQuestion[index].correct_answer
    );
    this.reponses = this.listeQuestion[index].incorrect_answers;
    }

    //Recupere la question à l'index en cours
    async questionSuivante(index:number){
      this.listeQuestion = await this.trivia.getQuestions();
      this.intitule = this.listeQuestion[index].question;
      this.populateAnswers(index);
    }

    //Vérivation de la réponse
    checkAnswer(reponse:string){
      if(reponse === this.listeQuestion[this.numQuestion].correct_answer){
        this.score++;
        return "Bonne"; 
      }else{
        return "Mauvaise";
      }
    }

    //Disactiver les réponses
    disableAnswers(){
      this.isDisabled = true;
    }
  }
