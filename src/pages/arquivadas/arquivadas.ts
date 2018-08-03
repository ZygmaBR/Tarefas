import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';

import {TarefasService} from '../../providers/tarefas/tarefas'

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
          }
        }]
    });
    removeTarefa.present();
  }

  limpaTarefasArquivadas(){
    let removeTarefa = this.alertController.create({
      title: "Remover tarefa",
      message: "Gostaria de limpar todas as tarefas arquivadas? Isso não poderá ser desfeito.",
      buttons:[
        {
          text: "Cancelar"
        },
        {
          text:"Limpar",
          handler: ()=>{
            this.delAllTarefas();
          }
        }]
    });
    removeTarefa.present();
  }

  delTarefa(index){
    this.tarefasArquivadas.splice(index, 1);
    this.tarefasService.saveTarefasArquivadas(this.tarefasArquivadas,'Tarefa arquivada removida.');
  }
  delAllTarefas(){
    this.tarefasArquivadas.splice(0, this.tarefasArquivadas.length);
    this.tarefasService.saveTarefasArquivadas(this.tarefasArquivadas,'Tudo limpo.');
  }
}
