import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/Patient';

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
  dob: string;
  address: string;
  navLinks = ['Hello1']
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.name = this.route.snapshot.paramMap.get('name');
    this.email = this.route.snapshot.paramMap.get('email');
    this.phone = Number(this.route.snapshot.paramMap.get('phone'));
    this.gender = this.route.snapshot.paramMap.get('gender');
    this.dob = this.route.snapshot.paramMap.get('dob');
    this.address = this.route.snapshot.paramMap.get('addr');

  }

}
