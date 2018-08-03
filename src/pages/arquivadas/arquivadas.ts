import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';

import {TarefasService} from '../../providers/tarefas/tarefas'

/**
 * Generated class for the ArquivadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-arquivadas',
  templateUrl: 'arquivadas.html',
})
export class ArquivadasPage {
  public tarefasArquivadas;

  constructor(private tarefasService: TarefasService,
              private alertController:AlertController,
              public navParams: NavParams) {

    this.tarefasArquivadas = this.tarefasService.getTarefasArquivadas();
  }

  alertaRemoveTarefaArquivada(index){
    let removeTarefa = this.alertController.create({
      title: "Remover tarefa",
      message: "Gostaria de remover a tarefa? Isso não poderá ser desfeito.",
      buttons:[
        {
          text: "Cancelar"
        },
        {
          text:"Remover",
          handler: ()=>{
            this.delTarefa(index);
            this.tarefasService.doToast("A tarefa foi removida.",3000);
          }
        }]
    });
    removeTarefa.present();
  }

  delTarefa(index){
    this.tarefasArquivadas.splice(index, 1);
    this.tarefasService.saveTarefasArquivadas(this.tarefasArquivadas);
  }
}
