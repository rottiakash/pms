import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AddComponent } from './components/add/add.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ListComponent } from './components/list/list.component';
import { DetailComponentComponent } from './components/detail-component/detail-component.component';

const routes: Routes = [
  { path:"", redirectTo:"home", pathMatch:"full" },
  { path:"home", component:HomeComponent },
  { path:"search", component:SearchComponent, canActivate: [AngularFireAuthGuard] },
  { path:"add", component:AddComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"list/:name", component:ListComponent, canActivate: [AngularFireAuthGuard]  },
  { path:"detail/:id/:name/:email/:phone/:gender/:dob/:addr", component:DetailComponentComponent, canActivate: [AngularFireAuthGuard]  }
];
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['home']);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
