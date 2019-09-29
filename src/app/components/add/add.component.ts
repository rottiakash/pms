import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  name:any;
  email:any;
  phone:any;
  gender:any="gender";
  age:any;
  addr:any;
  url:String;
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  add(){
    //console.log(this.name);
    //console.log(this.email);
    //console.log(this.phone);
    //console.log(this.gender);
    var address:String = (this.addr);
    address = address.replace('/','*');
    //console.log(address)
    //this.url="https://rottiakash.pythonanywhere.com/addPatient/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+dd+"-"+mmm+"-"+yyyy+"/"+this.addr;
    //console.log(this.url);
     this.http.get("https://rottiakash.pythonanywhere.com/addPatient/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+this.age+"/"+address, {observe: 'response'})
    .subscribe(response => {
      window.alert("Added Successfully");
      // You can access status:
      //console.log(response.status);
      // Or any other header:
      //console.log(response.headers.get('X-Custom-Header'));
    }); 
  }
}
