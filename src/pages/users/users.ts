import { DataTableModule } from 'angular-6-datatable';
import { ApiProvider } from '../../providers/api/api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  users : any = [];
  finalUsers : any = [];

  constructor(public navCtrl: NavController, private apiProvider : ApiProvider, private dataTable : DataTableModule) {

  }

  ionViewWillEnter(){
   this.loadData("");
  }


  loadData(val){
    this.users = [];
    this.finalUsers = [];
    this.apiProvider.loadAllUsers().then(data =>{
      this.users = data;
      this.users.forEach(element => {
        var createdAt = new Date(element["createdAt"]);

          this.apiProvider.apiGetCommandesByUser(element["id"]).then(dataCommandes =>{
            
            var nbReserved = 0;
            var orders : any = dataCommandes;
            orders.forEach(element => {
              nbReserved += element["qtite"]
            });
            var detailObject = {fName : element["fName"], sName : element["sName"], createdAt : createdAt, nbReserved : nbReserved };
            if(val != ""){
              if(element["fName"].indexOf(val) >= 0 || element["sName"].indexOf(val) >= 0)
                this.finalUsers.push(detailObject);
            }else{
              this.finalUsers.push(detailObject);
            }
          }, err =>{
        });
      });
    }, err =>{
      console.log(err);
    });
  }

  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val);

    this.loadData(val);
  }

}
