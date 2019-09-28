import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})
export class MiscComponent implements OnInit {

  id:Number;
  name:String;
  show:any;
  per = false;
  xlist: Observable<String[]>
  uploadPercent:Observable<number>;
  constructor(private route:ActivatedRoute,private http:HttpClient,private storage:AngularFireStorage) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.name = this.route.snapshot.paramMap.get('name');
    this.xlist = this.http.get<String[]>("http://localhost:5000/getMisc/"+this.id)
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
      this.http.get("http://localhost:5000/addMisc/"+this.id+"/"+filePath, {observe: 'response'})
    .subscribe(response => {
      window.alert("Upload complete")
      this.xlist = this.http.get<String[]>("http://localhost:5000/getMisc/"+this.id)
      // You can access status:
      console.log(response.status);
      // Or any other header:
      console.log(response.headers.get('X-Custom-Header'));
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

}
