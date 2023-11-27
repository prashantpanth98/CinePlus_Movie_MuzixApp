import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
import { TmDBApiService } from 'src/app/Services/tm-dbapi.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  
})
export class DashBoardComponent {
  
  p:number=1;
  count:number=10
 
  
  images = [
    './assets/banner9.jpg', './assets/banner14.jpg', './assets/banner15.jpg', './assets/banner16.jpg',
    './assets/banner17.jpg', './assets/UpComming1.jpg', './assets/Upcomming2.jpg', 
    './assets/upcomming3.jpg', './assets/upcomming4.jpg', './assets/upcomming5.jpg', './assets/Upcomming8.jpg',
    './assets/upcomming9.jpg','./assets/upcomming10.jpg','./assets/upcomming11.jpg','./assets/upcomming12.jpg',
    './assets/upcomming13.jpg','./assets/upcomming14.jpg','./assets/upcomming15.jpg','./assets/upcomming16.jpg'
    ,'./assets/upcomming18.webp','./assets/upcomming19.jpg','./assets/upcomming20.jpg'
  ];
  currentImage = this.images[0];
  intervalId: any;

  nextImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    if (currentIndex < this.images.length - 1) {
      this.currentImage = this.images[currentIndex + 1];
    } else {
      this.currentImage = this.images[0];
    }
  }

  prevImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    if (currentIndex > 0) {
      this.currentImage = this.images[currentIndex - 1];
    } else {
      this.currentImage = this.images[this.images.length - 1];
    }
  }

  startAutoScroll() {
    this.intervalId = setInterval(() => {
      const currentIndex = this.images.indexOf(this.currentImage);
      if (currentIndex < this.images.length - 1) {
        this.currentImage = this.images[currentIndex + 1];
      } else {
        this.currentImage = this.images[0];
      }
    }, 3000);
  }

  favoriteMovieList:any
 recmendedMovies(){
  this.route.navigateByUrl("recomandation")
 }

  stopAutoScroll() {
    clearInterval(this.intervalId);
  }
  openDialog(data: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data
    });
  }

  display:any;
  constructor(private tmdbservice:TmDBApiService,
    private movieSer:MovieServiceService, 
     private dialog: MatDialog,private snackBr:MatSnackBar,
     private route:Router){}
movieName:any;
storeSerachHistory:any=[]
searchMovie(){
  this.tmdbservice.searchMovies(this.movieName).subscribe((resp)=>{
    // this.storeSerachHistory.push(this.movieName)
    // alert(this.storeSerachHistory.length)
    // console.log(this.storeSerachHistory);
    if(resp){
      this.bannerApiData=resp.results
      if(resp.results.length!=0){
        this.bannerApiData=resp.results
        this.snackBr.open("Your searches are Here","ok",{duration:2000})
      }else{
      this.snackBr.open("No Movies are Available For your search","ok",{duration:2000})
      }
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
  })
}


bannerApiData: any=[];
ngOnInit(){
  this.tmdbservice.showMovies().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      // this.snackBr.open("You are On Home Movies Section","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
    
    
    })
}
addFav:any=[]
addToFavListOfUser(movie:any){
   this.movieSer.saveMovieToToList(movie).subscribe((res)=>{
    if(res==true){
      this.snackBr.open("Movie Added To Your FavList ","Successfully",{duration:2000})
    }else{
      this.snackBr.open("Movie Already Present in Your FavList ","Check FavList",{duration:5000})
    }}
    ,(err:Error)=>{
      if(err.message.endsWith("0 Unknown Error"||"500 Internal Server Error")){
        this.snackBr.open(`Internal Server Error!!`,"Sorry",{
          duration:4000
        })
      }if(err.message.endsWith("404 Not Found")){
        this.snackBr.open(`User Does Not exist !!`,"Sorry",{
          duration:4000
        })
      }
    }



  )
   
    
}
showHindiRomantic(){
  this.tmdbservice.showHindiRomantic().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Kids Movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
    })
}

ShowKids(){
  this.tmdbservice.showKids().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Kids Movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
    })
}
showTrendWeek(){
  this.tmdbservice.showTrendingWeek().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Trending Week Movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}
showTrenDAY(){
  this.tmdbservice.showTrendingDay().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Trending Day Movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
    })
}
showEnglishUpCommingMovies(){
  this.tmdbservice.showEnglishUpCommingMovies().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Recent English Movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}
showHindiUpCommingMovies(){
  this.tmdbservice.showHindiUpCommingMovies().subscribe((res)=>{
    
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Recent Hindi Movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}

showEnglishMovies(){
  this.tmdbservice.showEnglishPopularMovies().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      console.log(this.bannerApiData)
      this.snackBr.open("You are On Popular English Movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}
showHindiMovies(){
  this.tmdbservice.showHindiPopularMovies().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Popular Hindi Movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}






showEnglishTV(){
  this.tmdbservice.ShowEnglishTVShow().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On English TV show","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}
showHindiTV(){
  this.tmdbservice.ShowHindiTVShow().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Hindi TV show","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}

showMalayalamMovies(){
  this.tmdbservice.showMalayalamPopularmovies().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Popular Malayalam  movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}
showMalayalamUpcommingMovies(){
  this.tmdbservice.showMalayalamUpcomming().subscribe((res)=>{
    
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Recent Malayalam  movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })

   

}





showKannadaMovies(){
  this.tmdbservice.showKannadaPopularmovies().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On  Popular Kannada  movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}
showKannadaUpcommingMovies(){
  this.tmdbservice.showKannadaUpcomming().subscribe((res)=>{
    
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Recent Kannada movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}




bannerApiData1:any=[]

showTeluguMovies(){
  this.tmdbservice.showTeluguPopularmovies().subscribe((res)=>{
    console.log(res)
    console.log(res.results)
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Popular Telugu movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}
showTeluguUpcommingMovies(){
  this.tmdbservice.showTeluguUpcomming().subscribe((res)=>{
    
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Recent Telugu  movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}







showTamilMovies(){
  this.tmdbservice.showTamilPopularmovies().subscribe((res)=>{
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Popular Tamil  movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}
showTamilUpcommingMovies(){
  this.tmdbservice.showTamilUpcomming().subscribe((res)=>{
    
    if(res){
      this.bannerApiData=res.results
      this.snackBr.open("You are On Recent Tamil  movies","ok",{duration:2000})
    }else{
      this.snackBr.open("Check Your Connectivity","ok",{duration:5000})
    }
   })
}


getVideo(b: any) {
    this.tmdbservice.getMovievideo(b.id).subscribe(res => {
      const trailer = res.results.find((element: any) => element.type === "Trailer");
     if (trailer) {
       const trailerKey = trailer.key;
       if (trailerKey) {
           window.location.href = `https://www.themoviedb.org/video/play?key=${trailerKey}`;
        } else {
          this.snackBr.open("we are sorry the trailer is not available ", "OK", { duration: 5000 });
        }
      } else {
        this.snackBr.open("We are sorry, there is no trailer available for this movie. ", "OK", { duration: 5000 });
      
      }
    });
  }


 
}
