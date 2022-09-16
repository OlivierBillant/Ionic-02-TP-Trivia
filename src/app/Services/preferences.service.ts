import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Infos } from '../Models/infos';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }
  
  
  setInfos = async (infos: Infos) => {
    await Preferences.set({
      key: 'infos',
      value: JSON.stringify(infos),
    });
  };

  getInfos = async () => {
    const { value } = await Preferences.get({ key: 'infos' });
    console.log(`Hello ${value}!`);
    return value;
  };

}
