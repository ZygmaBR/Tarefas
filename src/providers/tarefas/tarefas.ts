import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class TarefasService {
  public tarefas;
  public tarefasArquivadas;
  public totalItens = {
    tarefas: null,
    tarefasArquivadas: null
  };
  private loader;

  constructor(public http: HttpClient,
              public events: Events,
              public toastController: ToastController,
              public storage: Storage,
              public loadingController: LoadingController) {
    console.log('TarefasService started.');
    this.initLoader('Carregando tarefas...aguarde');
    this.presentLoader();
    this.getData().tarefas.then(data => {
      this.tarefas = data || [];
      this.getData().tarefasArquivadas.then(data => {
        this.tarefasArquivadas = data || [];
        console.log('Loaded tarefas: ' + this.getTarefas());
        console.log('Loaded tarefasArqivadas: ' + this.getTarefasArquivadas());
        this.totalBadges();
        this.closeLoader();
      });
    });
    console.log('TarefasService finished.');
  }

  initLoader(msg) {
    this.loader = this.loadingController.create({
      content: msg,
    });
  };

  presentLoader() {
    this.loader.present()
  };

  closeLoader() {
    this.loader.dismiss();
  }

  doToast(msg, time) {
    const toast = this.toastController.create({
      message: msg,
      duration: time
    });
    toast.present();
  }

  getTarefasArquivadas() {
    return this.tarefasArquivadas;
  }

  getTarefas() {
    return this.tarefas;
  }

  getData() {
    return {
      tarefas: this.storage.get('tarefas'),
      tarefasArquivadas: this.storage.get('tarefasArquivadas')
    };
  }

  addTarefa(tarefa, msg) {
    this.tarefas.push(tarefa);
    this.saveTarefas(this.tarefas, msg);
  }

  saveTarefas(tarefa, msg) {
    this.storage.set('tarefas', tarefa).then(() => {
      if (msg) this.doToast(msg, 3000);
      this.totalBadges();
    });
  }

  addTarefaArquivada(tarefa, msg) {
    this.tarefasArquivadas.push(tarefa);
    this.saveTarefasArquivadas(this.tarefasArquivadas, msg);
  }

  saveTarefasArquivadas(tarefa, msg) {
    this.storage.set('tarefasArquivadas', tarefa).then(() => {
      if (msg) this.doToast(msg, 3000);
      this.totalBadges();
    });
  }

  totalBadges() {
    this.totalItens.tarefas = this.tarefas.length;
    this.totalItens.tarefasArquivadas = this.tarefasArquivadas.length;
    this.events.publish('updateBadges', this.totalItens);
  }

  getFullMinutes =function(date){
    if (date.getMinutes() < 10) {
      return '0' + date.getMinutes();
    }
    return date.getMinutes();
  };

  getFullHours = function (date) {
    if (date.getHours() < 10) {
      return '0' + date.getHours();
    }
    return date.getHours();
  };


  /*TODO
  // Get the array months and days from Myapp in app.modules.ts
  //
  */
  getDataporExtenso(dataIso) {
    let extenso;
    let meses = ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let mesesShort = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let diasSemana = ['Domingo', 'Segunda-feira', 'Ter\u00e7a-feira', 'Quarta-feira',
      'Quinta-feira', 'Sexta-feira', 'S\u00e1bado'];
    let diasSemanaShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S\u00e1b'];
    let data = new Date(dataIso);
    let userTimezoneOffset = data.getTimezoneOffset() * 60000;
    data = new Date(data.getTime() + userTimezoneOffset);
    let dia = data.getDate();
    let dias = data.getDay();
    let mes = data.getMonth();
    let ano = data.getFullYear();
    let hora = this.getFullHours(data);
    let min = this.getFullMinutes(data);
    return extenso = diasSemanaShort[dias] + ', ' + dia + ' de ' + mesesShort[mes] + ' de ' +
    ano + ' ' + hora + ':' + min;
  }
}
