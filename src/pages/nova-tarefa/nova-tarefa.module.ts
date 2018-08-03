import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaTarefaPage } from './nova-tarefa';

@NgModule({
  declarations: [
    NovaTarefaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaTarefaPage),
  ],
})
export class NovaTarefaPageModule {}
