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
  dob:any;
  addr:any;
  url:String;
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  add(){
    console.log(this.name);
    console.log(this.email);
    console.log(this.phone);
    console.log(this.gender);
    console.log(this.dob);  
    var address:String = (this.addr);
    address = address.replace('/','*');
    console.log(address)
    var string:String = String(this.dob)
    var tokens = string.split(" ")
    var dd:String = tokens[2];
    var mmm:String = tokens[1];
    var yyyy:String = tokens[3];
    //this.url="http://localhost:5000/addPatient/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+dd+"-"+mmm+"-"+yyyy+"/"+this.addr;
    console.log(this.url);
     this.http.get("http://localhost:5000/addPatient/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+dd+"-"+mmm+"-"+yyyy+"/"+address, {observe: 'response'})
    .subscribe(response => {
      window.alert("Added Successfully");
      // You can access status:
      console.log(response.status);
      // Or any other header:
      console.log(response.headers.get('X-Custom-Header'));
    }); 
  }
}
