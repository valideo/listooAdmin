import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  apiBaseUrl = "http://localhost:8080/api/";
  token = "";

  constructor(public http: HttpClient) {

  }


  //Login

  apiLoginAdmin(email : string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {headers: headers}
    let postData = {"email": email,"password": password}
    return new Promise((resolve, reject) => {
      this.http.post(this.apiBaseUrl+"loginAdmin", postData, options).subscribe(data => {
        this.token = data['token'];
        console.log(this.token);
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }



//Users 

  loadAllUsers() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    console.log(headers);
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"users/all/", options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  loadAllNewUsers() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"users/new/", options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //Restos

  loadAllRestos() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"users/allRestos/", options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  loadNewRestos() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"users/newRestos/", options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  //Orders

  loadAllOrders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"commandes/all/", options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  loadNewOrders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"commandes/new/", options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


}