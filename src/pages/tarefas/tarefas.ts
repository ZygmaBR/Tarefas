import { Component } from '@angular/core';
import {NavController, AlertController, reorderArray} from 'ionic-angular';
import {TarefasService} from '../../providers/tarefas/tarefas'

@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html'
})

export class TarefasPage {
  public tarefas;
  public reOrderTarefa=false;

  constructor(private tarefasService:TarefasService,
              public navCtrl: NavController,
              private alertController: AlertController) {
    this.tarefas = this.tarefasService.getTarefas();
   }

  alertaApagatarefa(indice){
    let novaTarefa = this.alertController.create({
      title: "Apagar Tarefa",
      message: "A tarefa será apagada. Tem certeza?",
      buttons:[
        {
          text: "Cancelar"
        },
        {
          text: "Apagar",
          handler: ()=>{
            this.tarefas.splice(indice,1);
            this.tarefasService.saveTarefas(this.tarefas, 'Tarefa removida.');
          }
        }
      ]
    });
    novaTarefa.present();
  }

  alertaEditarTarefa(indice){
    this.adicionaTarefa(this.tarefas[indice], indice);
  }

  reordenaTarefa($event){
    reorderArray(this.tarefas, $event);
    this.tarefasService.saveTarefas(this.tarefas,null);
  }

  alertaArquivaTarefa(tarefa,index){
    let removeTarefa = this.alertController.create({
      title: "Arquivamento",
      message: "Gostaria de arquivar a tarefa?",
      buttons:[
        {
          text: "Cancelar"
        },
        {
          text:"Arquivar",
          handler: ()=>{
            this.arquivaTarefa(tarefa,index);
          }
        }]
    });
    removeTarefa.present();
  }
  arquivaTarefa(tarefa,index){
    this.tarefas.splice(index, 1);
    this.tarefasService.saveTarefas(this.tarefas,null);
    this.tarefasService.addTarefaArquivada(tarefa,'Tarefa arquivada.');
  }



  adicionaTarefa(params, index) {
    this.navCtrl.push('NovaTarefaPage',
      {
        tarefa: params,
        indice: index
      });
  }
}
