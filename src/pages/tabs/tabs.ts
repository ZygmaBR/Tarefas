import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {HomePage} from '../home/home'
import {TarefasPage} from '../tarefas/tarefas'
import {ArquivadasPage} from '../arquivadas/arquivadas'

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  public totalItens ={
    tarefas:null,
    tarefasArquivadas : null
  };

  constructor(public events:Events) {
    this.tab1Root = HomePage;
    this.tab2Root = TarefasPage;
    this.tab3Root = ArquivadasPage;
    console.log('Tabs started');
    events.subscribe('updateBadges', badgeValues => {
      this.totalItens = badgeValues;
    });
    console.log('Tabs ended')
  }
}
