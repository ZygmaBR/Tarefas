import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {TarefasService} from '../../providers/tarefas/tarefas'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})

export class HomePage {

  constructor(private tarefasService:TarefasService,
              public navCtrl: NavController,
              private alertController: AlertController,
              public loadingController: LoadingController) {
  }
}

