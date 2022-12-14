import { Component } from '@angular/core';

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
  error_length: string = 'Votre mot de passe doit faire plus de 3 caractères';
  reponses: string[] = ['A', 'B', 'C', 'D'];
  constructor() {}

  button_commencer_click() {
    if (this.pseudo.length < 3) {
      this.message_isHidden = false;
    }else{
      this.form_isHidden = true;
      this.question_isHidden = false;
    }
  }

  button_reponse_click(){
    this.suivant_isHidden = false;
  }
}
