import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:Number;
  name:any;
  email:any;
  phone:any;
  gender:any;
  age:any;
  addr:any;
  url:string;
  constructor(private route:ActivatedRoute,private http:HttpClient,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.name = this.route.snapshot.paramMap.get('name');
    this.email = this.route.snapshot.paramMap.get('email');
    this.phone = Number(this.route.snapshot.paramMap.get('phone'));
    this.gender = this.route.snapshot.paramMap.get('gender');
    this.age = this.route.snapshot.paramMap.get('dob');
    this.addr = this.route.snapshot.paramMap.get('addr');
    this.addr = this.addr.replace('*','(');
    this.addr = this.addr.replace('^',')');
  }

  edit()
  {
       //console.log(this.name);
    //console.log(this.email);
    console.log(this.phone);
    //console.log(this.gender);
    var address:String = (this.addr);
    address = address.replace('/','*');
    //console.log(address)
    //this.url="http://localhost:5000/addPatient/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+dd+"-"+mmm+"-"+yyyy+"/"+this.addr;
    //console.log(this.url);
    this.url = "http://localhost:5000/edit/"+this.id+"/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+this.age+"/"+address;
    if(this.phone=="NaN")
    {
      this.url = "http://localhost:5000/editwop/"+this.id+"/"+this.name+"/"+this.email+"/"+this.phone+"/"+this.gender+"/"+this.age+"/"+address;

    }
     this.http.get(this.url, {observe: 'response'})
    .subscribe(response => {
      this.snackbar.open('Patient Edited', 'Dismiss', {
        duration: 3000
      });
      this.router.navigateByUrl("/home");
      // You can access status:
      //console.log(response.status);
      // Or any other header:
      //console.log(response.headers.get('X-Custom-Header'));
    }); 
  }

}
