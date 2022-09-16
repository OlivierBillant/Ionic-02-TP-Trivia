import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Infos } from '../Models/infos';
import { PreferencesService } from '../Services/preferences.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  score: number = 1000;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private preferences: PreferencesService
    ) { }

  ngOnInit() {
    this.score = parseInt(this.activatedRoute.snapshot.params.score);
  }


  async button_recommencer_click(){
    let info = JSON.parse(await this.preferences.getInfos());
    this.preferences.setInfos(new Infos(info.pseudo, info.difficulty, this.score))
    this.navigate('game', info.pseudo, info.difficulty, this.score.toString());
  }

  button_quitter_click(){
    this.navigateHome('home');
    this.preferences.setInfos(new Infos('', '', 0))
  }

  //Methode navigatge
  navigateHome(adresse: string) {
    this.router.navigate(['/' + adresse]);
  }

   //Methode navigatge
   navigate(adresse: string, pseudo: string, difficulte: string, score: string) {
    this.router.navigate(['/' + adresse, pseudo, difficulte, score]);
  }
}
