import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Question } from '../Models/question';
import { OpenTriviaService } from '../Services/open-trivia.service';
import { RngService } from '../Services/rng.service';
import { Router } from '@angular/router';
import { Infos } from '../Models/infos';
import { PreferencesService } from '../Services/preferences.service';

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
  contrainte = 3;
  niveau: string = '';
  score: number = 0;
  isToggled: boolean = false;
  error_length: string =
    'Votre mot de passe doit faire plus de ' + this.contrainte + ' caractères';


  constructor(
    private alertController: AlertController,
    private trivia: OpenTriviaService,
    private router: Router,
    private preferences: PreferencesService

  ) { }

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
      
      console.log(this.niveau);
      this.saveData();
      this.getData();
      console.log("Test valeurs des éléments passés avant l'envoi vers la page de jeu");
      console.log(this.pseudo);
      console.log(this.niveau);
      console.log(this.score);
      this.navigate('game',this.pseudo, this.niveau, this.score.toString());

      // this.form_isHidden = true;
      // this.question_isHidden = false;

    }
  }

 

  //Methode navigatge
  navigate(adresse: string, pseudo: string, difficulte: string, score: string) {
    this.router.navigate(['/' + adresse, pseudo, difficulte, score]);
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

  //Gestion sauvegarde des données
  toggle() {
    console.log(this.isToggled);
  }

  saveData() {
    if (this.isToggled) {
      this.preferences.setInfos(new Infos(this.pseudo, this.niveau, this.score))
    }
      else{
        this.preferences.setInfos(new Infos('', '', 0))
      }
  }

  async getData(){
    let info = await this.preferences.getInfos();
    console.log('Infos enregistrées');
    console.log(info);
  }

  // removeName = async () => {
  //   await Preferences.remove({ key: 'name' });
  // };

}
