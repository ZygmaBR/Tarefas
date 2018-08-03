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
            this.tarefasService.saveTarefas(this.tarefas);
          }
        }
      ]
    });
    novaTarefa.present();
  }

  alertaEditarTarefa(i){
    let editaTarefa = this.alertController.create({
      title: "Editar tarefa",
      message: "Editar sua tarefa?",
      inputs: [
        {
          type: "text",
          name:"inputEditaTarefa",
          value: this.tarefas[i]
        }
      ],
      buttons:[
        {
          text: "Cancelar"
        },
        {
          text:"Salvar",
          handler: (inputData)=>{
            this.editarTarefas(i,inputData.inputEditaTarefa);
            this.tarefasService.saveTarefas(this.tarefas);
            this.tarefasService.doToast('Tarefa editada com sucesso.', 3000);
          }
        }]
    });
    editaTarefa.present();
  }

  reordenaTarefa($event){
    reorderArray(this.tarefas, $event);
    this.tarefasService.saveTarefas(this.tarefas);
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
            this.tarefasService.doToast('A tarefa foi arquivada.',3000);
          }
        }]
    });
    removeTarefa.present();
  }
  arquivaTarefa(tarefa,index){
    this.tarefas.splice(index, 1);
    this.tarefasService.saveTarefas(this.tarefas);
    this.tarefasService.saveTarefasArquivadas(tarefa);
  }

  editarTarefas(index, tarefa){
    this.tarefas[index]=tarefa;
  }

  adicionaTarefa(){
    this.navCtrl.push('NovaTarefaPage')}

}
