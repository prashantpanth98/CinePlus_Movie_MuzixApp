import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
import { LoginComponent } from '../login/login.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  images = [
    './assets/banner1.jpg', './assets/banner2.jpg', './assets/banner3.jpg', './assets/banner4.jpg', './assets/banner5.jpg', 
    './assets/banner6.jpg', './assets/banner7.jpg', './assets/banner8.jpg', './assets/banner9.jpg', './assets/banner10.jpg', 
    './assets/banner11.jpg', './assets/banner12.jpg', './assets/banner13.jpg', './assets/banner14.jpg', './assets/banner15.jpg', 
    './assets/banner16.jpg', './assets/banner17.jpg', './assets/banner18.jpg', './assets/banner19.jpg', './assets/banner20.jpg', 
    './assets/banner21.jpg', './assets/banner22.jpg', 

  ];

  
  currentImage!: string ;
  favoriteMovieList: any;
  

  ngOnInit() {
    
    this.startImageRotation();
  }

  startImageRotation() {
    let index = 0;
    this.currentImage = this.images[index];
   
    setInterval(() => {
      index = (index + 1) % this.images.length;
      this.currentImage = this.images[index];
    }, 3000);
  }
  constructor(private movieser:MovieServiceService,private route:Router,private dialog:MatDialog){
    
  }
  valid:any;
  addToWatchlist(){
    this.movieser.GetAllUserFavMovies().subscribe((res)=>{
      this.favoriteMovieList=res;
      console.log(res)
      if(this.favoriteMovieList.length==0){
        this.route.navigateByUrl("/dashboard")
      }
      this.route.navigateByUrl("/favmovies")
      
     },(error:Error)=>{
      this.route.navigateByUrl("/dashboard")
         this.favoriteMovieList.length==0;
          
     }) 
   
  }
  isLoggedIn=this.movieser.loginVerified(sessionStorage.getItem("Token"));
  signUp(){
    this.route.navigateByUrl("/signup")
  }
 
}
