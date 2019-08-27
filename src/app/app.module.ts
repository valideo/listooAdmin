import { DetailRestoPage } from './../pages/detail-resto/detail-resto';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { RestosPage } from '../pages/restos/restos';
import { UsersPage } from './../pages/users/users';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PaniersPage } from './../pages/paniers/paniers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';
import {DataTableModule} from "angular-6-datatable";

@NgModule({
  declarations: [
    MyApp,
    RestosPage,
    UsersPage,
    HomePage,
    TabsPage,
    PaniersPage,
    DetailRestoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    DataTableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RestosPage,
    UsersPage,
    HomePage,
    TabsPage,
    PaniersPage,
    DetailRestoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    NativeStorage
  ]
})
export class AppModule {}
