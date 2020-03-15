import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Patient';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  name:String;
  patients: Patient[];
  dataSource : any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id','name','email','phone','gender','dob','addr'];
  constructor( private route: ActivatedRoute,private http:HttpClient, private router: Router) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    if(this.name!="null")
      var url = "http://localhost:5000/getp/"+this.name;
    else
    var url = "http://localhost:5000/listall";
     this.http.get<Patient[]>(url).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(row){
    var address:String = row.address;
    address = address.replace('(','*');
    address = address.replace(')','^');
    address = address.replace('/','%2F');
    this.router.navigateByUrl('detail/'+row.id+'/'+row.name+'/'+row.email+'/'+row.phone+'/'+row.gender+'/'+row.dob+'/'+address);
  }


}
