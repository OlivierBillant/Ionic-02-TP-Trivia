import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
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
  contrainte = 5;
  error_length: string =
    'Votre mot de passe doit faire plus de ' + this.contrainte + ' caractères';
  reponses: string[] = ['A', 'B', 'C', 'D'];
  couleurs: string[] = ['primary', 'success', 'danger', 'warning'];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private rngService: RngService
  ) {}

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
      this.form_isHidden = true;
      this.question_isHidden = false;
    }
  }

  async button_reponse_click(
    position: 'top' | 'middle' | 'bottom',
    reponse: string
  ) {
    this.suivant_isHidden = false;
    const toast = await this.toastController.create({
      message: 'Votre réponse est ' + reponse,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
