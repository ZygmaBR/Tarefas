import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TarefasService} from '../../providers/tarefas/tarefas';

@IonicPage()
@Component({
  selector: 'page-nova-tarefa',
  templateUrl: 'nova-tarefa.html',
})
export class NovaTarefaPage {
  public tarefa={
    titulo:null,
    descricao:null,
    tipo:null,
    status:'Em andamento',
    lista:null,
    dataCriacao:null,
    dataPrevisao:null
  };
  public tarefas;
  public edit = false;
  public indice;
  public pageTitle;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tarefasService: TarefasService) {
    this.tarefas = this.tarefasService.getTarefas();
    this.pageTitle = 'Nova Tarefa';
    if (this.navParams.get('tarefa')) {
      this.tarefa = this.navParams.get('tarefa');
      this.indice = this.navParams.get('indice');
      this.edit = true;
      this.pageTitle = 'Editar Tarefa';
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
      this.tarefa.dataCriacao = NovaTarefaPage.getIsoDate();
      this.tarefasService.addTarefa(this.tarefa,null);
    }
    this.navCtrl.pop();
  }

  static getIsoDate(){
    let d = new Date();
    return d.toISOString();
  }
}
