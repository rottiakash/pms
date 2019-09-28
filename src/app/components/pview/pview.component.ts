import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-pview',
  templateUrl: './pview.component.html',
  styleUrls: ['./pview.component.css']
})
export class PviewComponent implements OnInit {
  uid:string;
  imgURL:Observable<String | null>;
  constructor(private route:ActivatedRoute,private http:HttpClient,private storage: AngularFireStorage) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log(this.uid);
    this.imgURL = this.storage.ref(this.uid).getDownloadURL();
  }

}
