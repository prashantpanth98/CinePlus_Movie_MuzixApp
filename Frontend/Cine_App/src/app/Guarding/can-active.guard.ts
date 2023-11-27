import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';


import { MatDialog } from '@angular/material/dialog';
import { MovieServiceService } from '../Services/movie-service.service';
import { LoginComponent } from '../Components/login/login.component';



@Injectable({
  providedIn: 'root'
})
export class CanActiveGuard implements CanActivate {
  constructor(private router:Router,private movieSer:MovieServiceService,public dialog: MatDialog){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.movieSer.loggedIn){
        return true;
        }else{
       this.router.navigate(["/"])
          return false;
        }
  }
  
}
