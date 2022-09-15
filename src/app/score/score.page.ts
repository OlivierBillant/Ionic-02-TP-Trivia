import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  score: number = 1000;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.score = parseInt(this.activatedRoute.snapshot.params.score);
  }

}
