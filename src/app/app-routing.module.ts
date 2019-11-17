import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AddComponent } from './components/add/add.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ListComponent } from './components/list/list.component';
import { DetailComponentComponent } from './components/detail-component/detail-component.component';
import { TreatmentViewComponent } from './components/treatment-view/treatment-view.component';
import { PviewComponent } from './components/pview/pview.component';
import { XrayComponent } from './components/xray/xray.component';
import { ReportComponent } from './components/report/report.component';
import { MiscComponent } from './components/misc/misc.component'; 
import { RedirectComponent } from './components/redirect/redirect.component';
import { EditComponent } from './components/edit/edit.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path:"", redirectTo:"home", pathMatch:"full" },
  { path:"home", component:HomeComponent },
  { path:"search", component:SearchComponent, canActivate: [AngularFireAuthGuard] },
  { path:"add", component:AddComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"list/:name", component:ListComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"detail/:id/:name/:email/:phone/:gender/:dob/:addr", component:DetailComponentComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"treatmentView/:tid/:date/:time/:title/:pname", component:TreatmentViewComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"pview/:uid", component:PviewComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"xray/:id/:name", component:XrayComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"report/:id/:name", component:ReportComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"misc/:id/:name", component:MiscComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"redirect", component:RedirectComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"edit/:id/:name/:email/:phone/:gender/:dob/:addr", component:EditComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"about", component:AboutComponent },
];
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['home']);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
