import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class TarefasService {
  public tarefas;
  public tarefasArquivadas;
  private loader;

  constructor(public http: HttpClient,
              public toastController:ToastController,
              public storage:Storage,
              public loadingController: LoadingController) {
    console.log('TarefasService started.');
    this.initLoader('Carregando tarefas...aguarde');
    this.presentLoader();
    this.getData().tarefas.then(data=>{
      this.tarefas = data || [];
      this.getData().tarefasArquivadas.then(data=>{
        this.tarefasArquivadas = data || [];
        this.closeLoader();
      });
    });
    console.log('TarefasService finished.');
  }

  initLoader(msg){
    this.loader = this.loadingController.create({
      content: msg,
    });
  };
  presentLoader() {
    this.loader.present()
  };
  closeLoader(){
    this.loader.dismiss();
  }

  doToast(msg, time) {
    const toast = this.toastController.create({
      message: msg,
      duration: time
    });
    toast.present();
  }

  getTarefasArquivadas(){
    return this.tarefasArquivadas;
  }

  getTarefas(){
    return this.tarefas;
  }

  getData() {
    return {
      tarefas : this.storage.get('tarefas'),
      tarefasArquivadas: this.storage.get('tarefasArquivadas')};
  }

  addTarefa(tarefa,msg){
    this.tarefas.push(tarefa);
    this.saveTarefas(this.tarefas,msg);
  }
  saveTarefas(tarefa, msg) {
    this.storage.set('tarefas', tarefa).then(()=>{
      if (msg) this.doToast(msg, 3000)
    });
  }

  addTarefaArquivada(tarefa,msg){
    this.tarefasArquivadas.push(tarefa);
    this.saveTarefasArquivadas(this.tarefasArquivadas,msg);
  }


  saveTarefasArquivadas(tarefa, msg) {
    this.storage.set('tarefasArquivadas', tarefa).then(()=>{
      if (msg) this.doToast(msg, 3000)
    });
  }

}
