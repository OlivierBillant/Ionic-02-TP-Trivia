import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScorePage } from './score.page';

const routes: Routes = [
  {
    path: '',
    component: ScorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScorePageRoutingModule {}
