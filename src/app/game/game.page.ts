import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Question } from '../Models/question';
import { OpenTriviaService } from '../Services/open-trivia.service';
import { PreferencesService } from '../Services/preferences.service';
import { RngService } from '../Services/rng.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  suivant_isHidden: boolean = true;
  terminer_isHidden = true;
  isDisabled: boolean = false;
  niveauQuestion: string;
  intitule: string;
  numQuestion: number = 0;
  listeQuestion: Question[] = [];
  reponses: string[] = ['A', 'B', 'C', 'D'];
  couleurs: string[] = ['primary', 'success', 'danger', 'warning'];
  couleur: string = this.couleurs[0];
  pseudo: string = '';
  niveau: string = '';
  score: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private rngService: RngService,
    private trivia: OpenTriviaService,
    private router: Router,
    private preferences: PreferencesService
  ) { }

  ngOnInit() {
    console.log("Test valeurs des éléments passés avant assignations snapshot");
    console.log('Pseudo : '+this.pseudo);
    console.log('Niveau : '+this.niveau);
    console.log('Score : '+this.score);
    this.pseudo = this.activatedRoute.snapshot.params.pseudo;
    this.niveau = this.activatedRoute.snapshot.params.niveau;
    this.score = parseInt(this.activatedRoute.snapshot.params.score);
    this.questionSuivante(this.numQuestion);
    console.log("Test valeurs des éléments passés apres assignations snapshot");
    console.log(this.pseudo);
    console.log(this.niveau);
    console.log(this.score);
    
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

  //Au clic pour temriner
  button_terminer_click() {
    this.numQuestion = 0;
    this.disableAnswers();
    this.navigate('score', this.score.toString());

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
      this.terminer_isHidden = false;
    } else {
      this.suivant_isHidden = false;
      this.terminer_isHidden = true;
    }
  }

  //Methode navigatge
  navigate(adresse: string, param: string) {
    this.router.navigate(['/' + adresse, param]);
  }
}
