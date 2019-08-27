import { DetailRestoPage } from './../detail-resto/detail-resto';
import { DataTableModule } from 'angular-6-datatable';
import { ApiProvider } from '../../providers/api/api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-restos',
  templateUrl: 'restos.html'
})
export class RestosPage {

  restos : any = [];
  finalResto : any = [];

  constructor(public navCtrl: NavController, private apiProvider : ApiProvider, private dataTable : DataTableModule) {
    
  }

  ionViewWillEnter(){
   this.loadData("");
  }

  loadData(val : string){
    this.restos = [];
    this.finalResto = [];
    this.apiProvider.loadAllRestos().then(data =>{
      this.restos = data;
      this.restos.forEach(element => {
        var alreadyPush = false;
        var restoType = this.getTypeName(element["restoType"]);
        var createdAt = new Date(element["createdAt"]).toLocaleDateString();
        this.apiProvider.apiGetAnnonceByResto(element["id"]).then(dataAnnonce =>{

          if(dataAnnonce["isActive"])
            dataAnnonce["isActive"] = "Si";
          else
            dataAnnonce["isActive"] = "No";

          this.apiProvider.apiGetCommandesByAnnonce(dataAnnonce["id"]).then(dataCommandes =>{
            
            var nbReserved = 0;
            var orders : any = dataCommandes;
            orders.forEach(element => {
              nbReserved += element["qtite"]
            });
            if(alreadyPush == false){
              var detailObject = {id : element["id"], fName : element["fName"], sName : element["sName"], restoName : element["restoName"], createdAt : createdAt, restoType : restoType, nbReserved : nbReserved, isActive : dataAnnonce["isActive"]  };
              if(val != ""){
                if(element["fName"].indexOf(val) >= 0 || element["sName"].indexOf(val) >= 0 || element["restoName"].indexOf(val) >= 0)
                  this.finalResto.push(detailObject);
              }else{
                this.finalResto.push(detailObject);
              }
            }
            alreadyPush = true
          }, err =>{
            if(alreadyPush == false){
              var detailObject = {id : element["id"], fName : element["fName"], sName : element["sName"], restoName : element["restoName"], createdAt : createdAt, restoType : restoType, nbReserved : "Aucune Commande", isActive : dataAnnonce["isActive"]  };
              if(val != ""){
                if(element["fName"].indexOf(val) >= 0 || element["sName"].indexOf(val) >= 0 || element["restoName"].indexOf(val) >= 0)
                  this.finalResto.push(detailObject);
              }else{
                this.finalResto.push(detailObject);
              }
            }
            alreadyPush = true;
          });
        }, err =>{
          if(alreadyPush == false){
            var detailObject = {id : element["id"], fName : element["fName"], sName : element["sName"], restoName : element["restoName"], createdAt : createdAt, restoType : restoType, nbReserved : "Aucune Commande", isActive : "Annonce non créée"  };
            if(val != ""){
              if(element["fName"].indexOf(val) >= 0 || element["sName"].indexOf(val) >= 0 || element["restoName"].indexOf(val) >= 0)
                this.finalResto.push(detailObject);
            }else{
              this.finalResto.push(detailObject);
            }
          }
          console.log(err);
          alreadyPush = true
        });
      });
    }, err =>{
      console.log(err);
    });
  }

  getTypeName(type : string){
    if(type == "pizza")
      return "Pizza";
    else if(type == "burger")
      return "Hamburguesería";
    else if(type == "jap")
      return "Japonesa";
    else if(type == "pol")
      return "Pollo";
    else if(type == "col")
      return "Colombiana";
    else if(type == "bowl")
      return "Bowl";
    else if(type == "hot")
      return "Hot dog";
    else if(type == "sushi")
      return "Sushi";
    else if(type == "des")
      return "Desayunos";
    else if(type == "asi")
      return "Asiática";
    else if(type == "mexi")
      return "Mexicana";
    else if(type == "ita")
      return "Italiana";
    else if(type == "ara")
      return "Árabe";
    else if(type == "chu")
      return "Chuzo";
    else if(type == "car")
      return "Carne";
    else if(type == "peru")
      return "Peruana";
    else if(type == "empa")
      return "Empanadas";
    else if(type == "mar")
      return "Del mar";
    else if(type == "sand")
      return "Sándwich";
    else if(type == "jug")
      return "Jugos";
    else if(type == "cafe")
      return "Cafès";
    else if(type == "post")
      return "Postres";
  }

  goDetail(resto){
    this.navCtrl.push(DetailRestoPage, {"resto" : resto});
  }

  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val);

    this.loadData(val);
  }

}
