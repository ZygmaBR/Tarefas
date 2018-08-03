import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LongPressModule } from 'ionic-long-press';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArquivadasPage } from '../pages/arquivadas/arquivadas';
import {TarefasPage} from "../pages/tarefas/tarefas";

import { HttpClientModule } from "@angular/common/http";

import {TarefasService} from '../providers/tarefas/tarefas'
import {TabsPage} from "../pages/tabs/tabs";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArquivadasPage,
    TarefasPage,
    TabsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    LongPressModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArquivadasPage,
    TarefasPage,
    TabsPage
  ],
  providers: [
    TarefasService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
