import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { HeaderComponent } from './Components/header/header.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { FavMoviesComponent } from './Components/fav-movies/fav-movies.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './Components/view-profile/view-profile.component';
import { CanActiveGuard } from './Guarding/can-active.guard';
import { RecommendationComponent } from './Components/recommendation/recommendation.component';
import { UpdatePasswordComponent } from './Components/update-password/update-password.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"dashboard",
    component:DashBoardComponent,
    canActivate:[CanActiveGuard]
  },
  {
    path:"updatePass",
    component:UpdatePasswordComponent,
     canActivate:[CanActiveGuard]
  },
  {
    path:"editprofile",
    component:EditProfileComponent,
     canActivate:[CanActiveGuard]
  },
  {
    path:"viewprofile",
    component:ViewProfileComponent,
     canActivate:[CanActiveGuard]
  },
  {
    path:"home",
    component:HomeComponent,
     canActivate:[CanActiveGuard]
  },
  {
    path:"recomandation",
    component:RecommendationComponent,
    canActivate:[CanActiveGuard]
  },
  
  {
    path:"signup",
    component:SignUpComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signout",
    redirectTo:"/"
  },
  {
    path:"favmovies",
    component:FavMoviesComponent,
  canActivate:[CanActiveGuard]
  },
  
  {
    path:"contactUs",
    component:ContactUsComponent,
   },
  {
path:"about",
component:AboutUsComponent
  },
  {
  path:'',redirectTo:'/home',
  pathMatch:'full'
  },
  {
    path:'**',
     component:PageNotFoundComponent
 }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
