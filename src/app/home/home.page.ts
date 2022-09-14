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
  niveaux: string[] = ['easy', 'medium', 'hard'];
  form_isHidden: boolean = false;
  question_isHidden: boolean = true;
  suivant_isHidden: boolean = true;
  recommencer_isHidden = true;
  isDisabled: boolean = false;
  listeQuestion: Question[] = [];
  contrainte = 1;
  niveau: string;
  niveauQuestion: string;
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
    //Affichage d'un message d'alerte
    if (this.pseudo.length < this.contrainte) {
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
    this.score = 0;
    this.disableAnswers();
    // this.questionSuivante(this.numQuestion);
    this.form_isHidden = false;
    this.question_isHidden = true;
  }


  //Recupere la question à l'index en cours
  async questionSuivante(index: number) {
    this.listeQuestion = await this.trivia.getQuestionAPI(this.niveau);
    console.log(this.niveau);
    console.log("Liste question ");
    
    console.log(this.listeQuestion);
    
    this.intitule = this.listeQuestion[index].question;
    this.niveauQuestion = this.listeQuestion[index].difficulty
    this.populateAnswers(index);
  }

  //Genere le pool de reponse melangees
  //Alternativement on pourrait utiliser un Fisher-Yates.
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

    listeReponseTemp.splice(
      randomPosition,
      0,
      this.listeQuestion[index].correct_answer
    );
    this.reponses = listeReponseTemp;
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

  // Traitement du résultat d'une requête, retournée par le service, grâce au mot-clé then
  kittenImg: string = '';

  getKitten() {
    this.trivia.getCat().then((img: any) => {
      if (img.length > 1) {
        this.kittenImg = img;
      }
    });
  }

  // Traitement du résultat d'une requête, retournée par le service, grâce aux mots-clés async / await
  async getKittenAsync() {
    try {
      this.kittenImg = await this.trivia.getCat();
    } catch (error) {
      console.log(error);
    }
  }
}
