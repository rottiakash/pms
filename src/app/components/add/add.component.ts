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
  flag= true;
  addr:any;
  url:string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  add(){
    if(!this.name)
    {
      window.alert("Name not entered");
      this.flag = false;
    }
    if(!this.email)
    {
      this.email = "-"
    }
    if(this.gender == "gender")
    {
      window.alert("Please choose a gender");
      this.flag = false;
    }
    if(!this.age)
    {
      this.age = "-";
    }
    if(!this.addr)
    {
      this.addr = "-";
    }
    var address:String = (this.addr);
    address = address.replace('/','*');
    this.url =  "http://localhost:5000/addPatient/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+this.age+"/"+address;
    if(!this.phone)
    {
      this.phone = "null"
      this.url = "http://localhost:5000/addPatientwop/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+this.age+"/"+address;
    }
    if(this.flag)
      this.http.get(this.url, {observe: 'response'})
      .subscribe(response => {
        window.alert("Added Successfully");
        // You can access status:
        //console.log(response.status);
        // Or any other header:
        //console.log(response.headers.get('X-Custom-Header'));
      }); 
  }
}
