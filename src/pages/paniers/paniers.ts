import { DataTableModule } from 'angular-6-datatable';
import { ApiProvider } from '../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-paniers',
  templateUrl: 'paniers.html',
})
export class PaniersPage {

  paniers : any = [];
  finalPaniers : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider : ApiProvider, private dataTable : DataTableModule) {
  }

  ionViewWillEnter(){
   this.loadData();
  }

  loadData(){
    this.apiProvider.loadAllOrders().then(data =>{
      this.paniers = data;
      this.paniers.forEach(element => {

        
        var orderDate  = new Date(element["orderDateTime"]);

        this.apiProvider.apiGetAnnonce(element["idAnnonce"]).then(dataAnnonce =>{
          console.log(element);
          var status = "Reservado"
          if(element["isRecup"])
            status = "Recogido"
          

          this.apiProvider.apiLoadResto(dataAnnonce["idRestoUser"]).then(dataResto =>{
            var restoName = dataResto["restoName"];

            this.apiProvider.apiLoadResto(element["idUser"]).then(dataUser =>{
              var userFName = dataUser["fName"];
              var userSName = dataUser["sName"];

              var detailObject = {status : status, restoName : restoName, fName : userFName, sName : userSName, orderDate : orderDate};
              this.finalPaniers.push(detailObject);
            })
          })
        })
      });
    }, err =>{
      console.log(err);
    });
  }

}
