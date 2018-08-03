import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {HomePage} from '../home/home'
import {TarefasPage} from '../tarefas/tarefas'
import {ArquivadasPage} from '../arquivadas/arquivadas'

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = HomePage;
    this.tab2Root = TarefasPage;
    this.tab3Root = ArquivadasPage;
  }



}
