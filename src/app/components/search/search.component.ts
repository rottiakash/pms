import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  name:any;
  constructor(private router:Router) { }

  ngOnInit() {
  }
submit()
{
  this.router.navigateByUrl('/list/'+this.name);
}
}
