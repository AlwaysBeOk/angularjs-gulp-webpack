import './settings.scss';

export const SettingsTemplate = require('./settings.html');

export class SettingsController {

  /* @ngInject */
  constructor() {
  }
  permission_href(){
    // console.log("das");
    window.location = '#/set/1';
  }
  syncList_href(){
    window.location = '#/set/4';
  }
  transfer_href(){
    window.location = '#/set/2';
  }

}

