import { ApiProvider } from '../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isLoggedIn : boolean = false;
  restos : number = 0;
  restosNew : number = 0;
  users : number = 0;
  usersNew : number = 0;
  paniers : number = 0;
  paniersNew : number = 0;
  orders : number = 0;
  ordersNew : number = 0;
  money : number = 0;
  moneyNew : number = 0;
  moneyString : string = this.money.toLocaleString('es-CO');
  moneyNewString : string = this.moneyNew.toLocaleString('es-CO');

  constructor(public navCtrl: NavController, private apiProvider : ApiProvider, private alertCtrl : AlertController, private nativeStorage: NativeStorage, private events : Events) {

    this.nativeStorage.getItem('listooAdminLogin')
    .then(
      data =>{
        this.loginAdmin(data["username"], data["password"])
      },
      error => {
        this.presentPromptLogin();
      }
    );

    events.subscribe('moneyValue', () => {
      this.moneyString = '$ '+this.money.toLocaleString('es-CO');
      this.moneyNewString = '$ '+this.moneyNew.toLocaleString('es-CO');
    });
  }

  ionViewWillEnter(){
   this.loadData();
  }

 
  presentPromptLogin() {
    let alert = this.alertCtrl.create({
      title: 'Admin Login',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'username',
          placeholder: 'Email',
          value : ''
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          value : ''
        }
      ],
      buttons: [
        {
          text: 'Login',
          handler: data => {
           this.loginAdmin(data["username"], data["password"]);
          }
        }
      ]
    });
    alert.present();
  }

  loginAdmin(username : string, password : string){
    this.apiProvider.apiLoginAdmin(username, password).then(data =>{
      this.nativeStorage.setItem('listooAdminLogin', {username: username, password: password})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
      this.isLoggedIn = true;
      this.loadData();
    }, err =>{
      this.isLoggedIn = false;
      this.presentPromptLogin();
    });
  }

  loadData(){
    this.apiProvider.loadAllRestos().then(data =>{
      this.restos = data["length"];
    }, err =>{
      console.log(err);
    });

    this.apiProvider.loadNewRestos().then(data =>{
      this.restosNew = data["length"];
    }, err =>{
      console.log(err);
    });

    this.apiProvider.loadAllUsers().then(data =>{
      this.users = data["length"];
    }, err =>{
      console.log(err);
    });

    this.apiProvider.loadAllNewUsers().then(data =>{
      this.usersNew = data["length"];
    }, err =>{
      console.log(err);
    });

    this.apiProvider.loadAllOrders().then(data =>{
      this.orders = data["length"];
      var dataOrders : any = [];
      this.paniers = 0;
      dataOrders = data;
      dataOrders.forEach(element => {
        this.paniers += element["qtite"];
      });
    }, err =>{
      console.log(err);
    });

    this.apiProvider.loadNewOrders().then(data =>{
      this.ordersNew = data["length"];
      var dataOrders : any = [];
      this.paniersNew = 0;
      dataOrders = data;
      dataOrders.forEach(element => {
        this.paniersNew += element["qtite"];
      });
    }, err =>{
      console.log(err);
    });
    this.loadMoney();
  }


  loadMoney(){
    this.money = 0;
    this.moneyNew = 0;
    this.apiProvider.loadAllOrders().then(data =>{
      var orders : any = [];
      orders = data;
        orders.forEach(element => {
        this.apiProvider.apiGetAnnonce(parseInt(element["idAnnonce"])).then(dataAnnonce =>{
          this.apiProvider.apiLoadResto(dataAnnonce["idRestoUser"]).then(dataRestoUser =>{
            
            var finalPrice = (element["qtite"] * dataAnnonce["price"]*0.3); 
            this.money += finalPrice;
            this.events.publish('moneyValue');
          }, err =>{

          });
        }, err =>{

        });
      });
    }, err =>{

    });

    this.apiProvider.loadNewOrders().then(data =>{
      var orders : any = [];
      orders = data;
        orders.forEach(element => {
        this.apiProvider.apiGetAnnonce(parseInt(element["idAnnonce"])).then(dataAnnonce =>{
          this.apiProvider.apiLoadResto(dataAnnonce["idRestoUser"]).then(dataRestoUser =>{
            
            var finalPrice = (element["qtite"] * dataAnnonce["price"]*0.3); 
            this.moneyNew += finalPrice;
            this.events.publish('moneyValue');

          }, err =>{

          });
        }, err =>{

        });
      });
    }, err =>{

    });
  }

}
