import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Patient';
import { HttpClient } from '@angular/common/http';
import { PRecord } from 'src/app/PRecord';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css']
})
export class DetailComponentComponent implements OnInit {
  patient:Patient;
  id: number;
  name: string;
  email: string;
  phone: number;
  gender: string;
  show: any;
  dataSource:any;
  dob: string;
  address: string;
  navLinks = ['Hello1']
  title:any;
  displayedColumns: string[] = ['id', 'rid', 'tdate', 'title','ttime'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private route:ActivatedRoute, private http:HttpClient,private router:Router) { }
 
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.name = this.route.snapshot.paramMap.get('name');
    this.email = this.route.snapshot.paramMap.get('email');
    this.phone = Number(this.route.snapshot.paramMap.get('phone'));
    this.gender = this.route.snapshot.paramMap.get('gender');
    this.dob = this.route.snapshot.paramMap.get('dob');
    this.address = this.route.snapshot.paramMap.get('addr');
    this.address = this.address.replace('*','(');
    this.address = this.address.replace('^',')');
    this.http.get<PRecord[]>("https://rottiakash.pythonanywhere.com/getRecord/"+this.id).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
                                                                                            
  });
  this.dataSource.paginator = this.paginator;
  
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  selectRow(row)
  {
    this.router.navigateByUrl('/recordView/'+row.rid+'/'+row.tdate+'/'+row.ttime+'/'+row.title+'/'+this.name);
  }
  submit()
  {
    //console.log("Click");
    this.http.get("https://rottiakash.pythonanywhere.com/addRecord/"+this.id+"/"+this.title, {observe: 'response'})
    .subscribe(response => {
      window.alert("Added Successfully");
      this.http.get<PRecord[]>("https://rottiakash.pythonanywhere.com/getRecord/"+this.id).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
                                                                                            
  });
  this.dataSource.paginator = this.paginator;
      // You can access status:
      //console.log(response.status);
      // Or any other header:
      //console.log(response.headers.get('X-Custom-Header'));
    }); 
  }
}
