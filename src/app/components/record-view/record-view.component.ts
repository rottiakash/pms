import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StringLike } from '@firebase/util';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.css']
})
export class RecordViewComponent implements OnInit {
  rid: Number;
  date: String;
  time: String;
  title: String;
  pname: String;
  i = 1;
  show:any;
  plist:Observable<String[]>
  rlist:String[];
  per = false
  uploadPercent:Observable<number>;
  downloadURL:Observable<String>;
  constructor(private route:ActivatedRoute,private storage:AngularFireStorage, private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.rid  = Number(this.route.snapshot.paramMap.get('rid'))
    this.date  = this.route.snapshot.paramMap.get('date')
    this.time  = this.route.snapshot.paramMap.get('time')
    this.title  = this.route.snapshot.paramMap.get('title')
    this.pname = this.route.snapshot.paramMap.get('pname')
    this.plist = this.http.get<String[]>("https://rottiakash.pythonanywhere.com/getPresc/"+this.rid)
  }
  uploadFile(event) {
    this.per = true;
    const file = event.target.files[0];
    const filePath = this.makeid(20);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
      this.show = false;
      this.http.get("https://rottiakash.pythonanywhere.com/addPresc/"+this.rid+"/"+filePath, {observe: 'response'})
    .subscribe(response => {
      window.alert("Upload complete")
      this.plist = this.http.get<String[]>("https://rottiakash.pythonanywhere.com/getPresc/"+this.rid)
      // You can access status:
      //console.log(response.status);
      // Or any other header:
      //console.log(response.headers.get('X-Custom-Header'));
    }); 

      this.per = false;
    } )
   )
  .subscribe()
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    
  }
    makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 remove(uid)
 {
  this.http.get("https://rottiakash.pythonanywhere.com/remPresc/"+uid, {observe: 'response'})
  .subscribe(response => {
    this.storage.ref(uid).getDownloadURL().subscribe(e =>{
      this.storage.storage.refFromURL(e).delete();
      window.alert("Removed Entry");
      this.plist = this.http.get<String[]>("https://rottiakash.pythonanywhere.com/getPresc/"+this.rid)
    });
    // You can access status:
    //console.log(response.status);
    // Or any other header:
    //console.log(response.headers.get('X-Custom-Header'));
  }); 
 }

 removeRec()
 {
  this.http.get<String[]>("https://rottiakash.pythonanywhere.com/getPresc/"+this.rid).subscribe(data => {
    this.rlist = data;
    this.rlist.forEach(i => {
      this.http.get("https://rottiakash.pythonanywhere.com/remPresc/"+i, {observe: 'response'})
  .subscribe(response => {
    this.storage.ref(String(i)).getDownloadURL().subscribe(e =>{
      this.storage.storage.refFromURL(e).delete();
      this.plist = this.http.get<String[]>("https://rottiakash.pythonanywhere.com/getPresc/"+this.rid)
    });
  });
  });
  this.http.get('https://rottiakash.pythonanywhere.com/remRec/'+this.rid, {observe: 'response'}).subscribe(response =>{window.alert("Record removed");this.router.navigateByUrl('/home');});
 });
}
}
