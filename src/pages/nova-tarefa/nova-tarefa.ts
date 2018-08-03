import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TarefasService} from '../../providers/tarefas/tarefas';

/**
 * Generated class for the NovaTarefaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nova-tarefa',
  templateUrl: 'nova-tarefa.html',
})
export class NovaTarefaPage {
  public tarefa={
    titulo:null,
    descricao:null,
    tipo:null
  };
  public tarefas;
  public edit = false;
  public indice;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tarefasService: TarefasService) {
    this.tarefas = this.tarefasService.getTarefas();
    if (this.navParams.get('tarefa')) {
      this.tarefa = this.navParams.get('tarefa');
      this.indice = this.navParams.get('indice');
      this.edit = true;
    }
  }

  voltar(){
    this.navCtrl.pop();
  }
  editarTarefas(index, tarefa){
    this.tarefas[index]=tarefa;
    this.tarefasService.saveTarefas(this.tarefas,'Tarefa atualizada.')
  }
  salvarTarefa(){
    if (this.edit){
      this.editarTarefas(this.indice, this.tarefa);
    }else{
      this.tarefasService.addTarefa(this.tarefa,null);
    }
    this.navCtrl.pop();
  }

}
