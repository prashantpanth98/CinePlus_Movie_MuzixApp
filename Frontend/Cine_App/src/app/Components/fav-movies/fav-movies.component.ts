import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TmDBApiService } from 'src/app/Services/tm-dbapi.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DialogComponent } from '../dialog/dialog.component';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
@Component({
  selector: 'app-fav-movies',
  templateUrl: './fav-movies.component.html',
  styleUrls: ['./fav-movies.component.css']
})
export class FavMoviesComponent {
  constructor(private movieService:MovieServiceService,private tmdbservice: TmDBApiService ,public dialog: MatDialog, private router:Router,private snackBr :MatSnackBar) {
  }
 
  p:number=1;
  count:number=10
  
  favoriteMovieList:any;
 navigateToDashboard(){
  this.router.navigateByUrl("dashboard")
 }
  ngOnInit() {
     this.movieService. GetAllUserFavMovies().subscribe((res)=>{
     this.favoriteMovieList=res;
     console.log(res)
     
    },(error:Error)=>{
        this.favoriteMovieList.length==0;
         
    })  
    
}
openDialog(data: any) {
  const dialogRef = this.dialog.open(DialogComponent, {
    data: data
  });
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
ischeck:any;
deleteMovieFromFavouriteList(id:any){
  this.movieService.deleteOrderfromUser(id).subscribe((resp)=>{
    console.log(resp)
    this.ischeck=this.movieService.loginVerified(sessionStorage.getItem("Token"))
    
  if(resp=this.ischeck){
    
    this.snackBr.open(`Movie Deleted From Your FavList!!`,"Successfully",{
      duration:4000
    })
     location.reload()
  }else{
    this.snackBr.open(`Movie Not Deleted From Your FavList!!`,"Sorry",{
      duration:4000
    })
   // location.reload()
  }
  }
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
navigateTORecommendedMovies(){
  this.router.navigateByUrl("/recomandation")
}






































}
