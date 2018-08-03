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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tarefasService: TarefasService) {
  }

  voltar(){
    this.navCtrl.pop();
  }

  salvarTarefa(){
    this.tarefasService.addTarefa(this.tarefa);
    this.navCtrl.pop();
  }

}
