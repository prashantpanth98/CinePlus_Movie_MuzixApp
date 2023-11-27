import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmDBApiService {
  

  constructor(private httpclient:HttpClient) { }

  baseurl="https://api.themoviedb.org/3";
  apikey="2b6777dbfa7a9e2956e5fdc2a7d05b81"
  // video():Observable<any>{
  //   return this.httpclient.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`)
  // }
  
  recmondederrorMovies():Observable<any>{
    return this.httpclient.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&language=hi-IN&region=IN`)
  }
recmondedMovies(lang:any):Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_original_language=${lang}`)
}



  showHindiRomantic():Observable<any>{
    return this.httpclient.get("https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_genres=10749&with_original_language=hi")
  }








searchMovies(movie:any):Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/search/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&query=${movie}`)
}
showMovies():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&quer
`)
}


  showKids():Observable<any>{
return this.httpclient.get(` https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_genres=16`)
  }
  
  showTrendingWeek():Observable<any>{
   
   return this.httpclient.get(`https://api.themoviedb.org/3/trending/all/week?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&language=en-US`)
}
showTrendingDay():Observable<any>{
   
  return this.httpclient.get(`https://api.themoviedb.org/3/trending/all/day?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&language=en-US&sort_by=release_date.desc`)
}
showHindiPopularMovies():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_original_language=hi`)
}
showHindiUpCommingMovies():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie/?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&sort_by=release_date.desc&with_original_language=hi`)
}



showEnglishPopularMovies():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/movie/429473/recommendations?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&language=en-US`)
}
showEnglishUpCommingMovies():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&certification_country=US&include_adult=true&include_video=false&certification=R&sort_by=popularity.desc
   `)
  
}





ShowEnglishTVShow():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&language=en-US`)
}
ShowHindiTVShow():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/tv?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_original_language=hi`)
}


showMalayalamPopularmovies():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_original_language=ml`)
}
showMalayalamUpcomming():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&sort_by=release_date.desc&with_original_language=ml`)
}


showKannadaPopularmovies():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_original_language=kn`)
}
showKannadaUpcomming():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&sort_by=release_date.desc&with_original_language=kn`)
}

showTeluguPopularmovies():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_original_language=te`)
}
showTeluguUpcomming():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&sort_by=release_date.desc&with_original_language=te`)
}


showTamilPopularmovies():Observable<any>{
  return this.httpclient.get(` https://api.themoviedb.org/3/discover/movie?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&with_original_language=ta`)
}
showTamilUpcomming():Observable<any>{
  return this.httpclient.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81&sort_by=release_date.desc&with_original_language=ta`)
}
  getMovievideo(data:any):Observable<any>{
    return this.httpclient.get(`https://api.themoviedb.org/3/movie/${data}/videos?api_key=2b6777dbfa7a9e2956e5fdc2a7d05b81`)
  }
}
