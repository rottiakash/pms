import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Patient';
import { HttpClient } from '@angular/common/http';
import { PTreatment } from 'src/app/PTreatment';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar'

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
  displayedColumns: string[] = ['id', 'tid','title','attach', 'tdate','ttime'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private route:ActivatedRoute, private http:HttpClient,private router:Router,private snackbar:MatSnackBar) { }
 
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
    this.http.get<PTreatment[]>("http://localhost:5000/getTreatment/"+this.id).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;                                                                                      
  });
 
  
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  selectRow(row)
  {
    var title = row.title.replace('(','%28');
    title = title.replace(')','%29');
    this.router.navigateByUrl('/treatmentView/'+row.tid+'/'+row.tdate+'/'+row.ttime+'/'+title+'/'+this.name);
  }
  submit()
  {
    //console.log("Click");
    this.http.get("http://localhost:5000/addTreatment/"+this.id+"/"+this.title, {observe: 'response'})
    .subscribe(response => {
      this.snackbar.open('Added Treatment', 'Dismiss', {
        duration: 3000
      });
      this.http.get<PTreatment[]>("http://localhost:5000/getTreatment/"+this.id).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; 
                                                                                            
  });
      // You can access status:
      //console.log(response.status);
      // Or any other header:
      //console.log(response.headers.get('X-Custom-Header'));
    }); 
  }

  xray()
  {
    this.router.navigateByUrl('/xray/'+this.id+"/"+this.name);
  }
  report()
  {
    this.router.navigateByUrl('/report/'+this.id+"/"+this.name);
  }
  misc()
  {
    this.router.navigateByUrl('/misc/'+this.id+"/"+this.name);
  }
  edit()
  {
    var address=this.address;
    address = address.replace('(','*');
    address = address.replace(')','^');
    address = address.replace('/','%2F');
    this.router.navigateByUrl('/edit/'+this.id+'/'+this.name+'/'+this.email+'/'+this.phone+'/'+this.gender+'/'+this.dob+"/"+address);
  }

  rem()
  {
    this.http.get("http://localhost:5000/remPatient/"+this.id,{observe:'response'}).subscribe(response=>
    {
      this.snackbar.open('Removed Patient', 'Dismiss', {
        duration: 3000
      });
      this.router.navigateByUrl('/');
    })
  }
}
