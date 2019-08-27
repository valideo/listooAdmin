import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail-resto',
  templateUrl: 'detail-resto.html',
})
export class DetailRestoPage {
  resto : any;
  idResto : number = 0;
  fName : string;
  sName : string;
  email : string;
  tel : string;
  address : string;
  restoName : string;
  picUrl : string = "http://api.listoo.co/uploads/defaultPic.jpg";;
  registerDate : string;
  restoType : string;
  reservedToday : number = 0;
  leftToday : number = 0;
  statusString : string;
  totalToday : number = 0;
  price : number = 0;
  totalResto : string = "0";
  totalOrders : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider : ApiProvider) {
    this.resto = this.navParams.get("resto");
    this.idResto = this.resto.id;
    this.loadData();
  }

  loadData(){
    this.apiProvider.apiLoadResto(this.idResto).then(data =>{
      console.log(data);
      this.fName = data["fName"];
      this.sName = data["sName"];
      this.restoName = data["restoName"];
      this.tel = data["tel"];
      this.address = data["address"] + ", " + data["city"];
      this.email = data["email"];
      this.registerDate = this.resto.createdAt;
      this.restoType = this.resto.restoType;
      console.log(this.resto);
    })
    this.apiProvider.apiGetAnnonceByResto(this.idResto).then(data =>{
      if(data["piUrl"] != ""){
        var picName = data["piUrl"].substring(1, data["piUrl"].length-1);
        this.picUrl = "http://api.listoo.co/uploads/"+ picName;
      }
      this.price = data["price"] * 0.3;
      this.apiProvider.apiGetCommandesByAnnonceToday(data["id"]).then(
        (dataCommandes) => {
         this.reservedToday = 0;
          var orders: any = dataCommandes;
          orders.forEach((element) => {
            this.reservedToday += element['qtite'];
          });
          this.leftToday = data["qtite"] - this.reservedToday;
          this.totalToday = this.reservedToday * data["price"] * 0.3;
        },
        (err) => {}
      );
      this.apiProvider.apiGetCommandesByAnnonce(data["id"]).then(
        (dataCommandes) => {
         this.totalOrders = 0;
         this.totalResto = "0";
          var orders: any = dataCommandes;
          orders.forEach((element) => {
            this.totalOrders += element['qtite'];
          });
          this.totalResto = (this.totalOrders * data["price"] * 0.3).toLocaleString('es-CO');;
        },
        (err) => {}
      );
      console.log(data);
    })
  }

}
