import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RngService {

  constructor() { }

  getInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
