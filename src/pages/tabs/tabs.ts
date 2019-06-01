import { PaniersPage } from './../paniers/paniers';
import { UsersPage } from './../users/users';
import { Component } from '@angular/core';

import { RestosPage } from '../restos/restos';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RestosPage;
  tab3Root = UsersPage;
  tab4Root = PaniersPage

  constructor() {

  }
}
