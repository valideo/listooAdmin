import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailRestoPage } from './detail-resto';

@NgModule({
  declarations: [
    DetailRestoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailRestoPage),
  ],
})
export class DetailRestoPageModule {}
