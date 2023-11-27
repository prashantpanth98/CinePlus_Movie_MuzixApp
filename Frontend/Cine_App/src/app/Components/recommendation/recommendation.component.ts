import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
import { TmDBApiService } from 'src/app/Services/tm-dbapi.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {
 
  favoriteMovieList:any;
  recomendedList: any; 
  p:number=1;
count:number=10

 mostCommonLanguage!: string;
  navigateTOfavMovies(){
  this.router.navigateByUrl("favmovies")
  }
  AddTofavFavouriteList(x:any){
    this.movieService.saveMovieToToList(x).subscribe((res)=>{
      console.log(res)
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

  

  constructor(private movieService:MovieServiceService,
    private tmdbservice: TmDBApiService ,
    public dialog: MatDialog, 
    private router:Router,
    private snackBr :MatSnackBar) {
   }

 
  
 



 

 
  ngOnInit() {
    
   this.language();
}
language(){

  this.movieService.GetAllUserFavMovies().subscribe((res)=>{
 this.favoriteMovieList=res;
    const languageMap = this.favoriteMovieList.reduce((map: { has: (arg0: any) => any; set: (arg0: any, arg1: never[]) => void; get: (arg0: any) => any[]; }, movie: { original_language: any; }) => {
      const language = movie.original_language;
      if (!map.has(language)) {
        map.set(language, []);
      }
      map.get(language).push(movie);
      return map;
    }, new Map<string, any[]>());
   
  let mostCommonLanguage = '';
  let maxMovies = 0;

  for (const [language, movies] of languageMap) {
    if (movies.length > maxMovies) {
      mostCommonLanguage = language;
      maxMovies = movies.length;
    }
  }
   console.log(`The language with the most movies: ${mostCommonLanguage}`);
     this.tmdbservice.recmondedMovies(mostCommonLanguage).subscribe((res)=>{
       console.log(res)
       this.recomendedList=res.results
      if(this.favoriteMovieList.length==0){
        this.tmdbservice.recmondederrorMovies().subscribe((res)=>{
          console.log(res)
          this.recomendedList=res.results
          
        })
      }
     })
   },(err:Error)=>{
    console.log(err)
    this.tmdbservice.recmondederrorMovies().subscribe((res)=>{
      console.log(res.results)
      this.recomendedList=res.results
    })
    
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

}
