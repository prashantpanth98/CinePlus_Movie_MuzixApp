import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {


  public loggedIn:boolean=false;
  

  constructor(private http:HttpClient,private router:Router) { }
 email: any;
  loginVerified(token:any):boolean{
  if(token==undefined || token=='' || token==null){
      return this.loggedIn=false;
    }else{
      return this.loggedIn=true;
    }
   }


   loginOut():boolean{
    
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userName');
    location.reload();
    return  this.loggedIn=false;
   }

   getdob():Observable<any>{
    console.log(sessionStorage.getItem("Token"))
    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
    console.log(sessionStorage.getItem("Token"))
   let reqOption={headers:httphead}
   console.log(reqOption)
    return this.http.get(`http://localhost:9000/user/v1/getdob/${sessionStorage.getItem("email")}`,reqOption)  
  }
  getName():Observable<any>{
    console.log(sessionStorage.getItem("Token"))
    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
    console.log(sessionStorage.getItem("Token"))
   let reqOption={headers:httphead}
   console.log(reqOption)
    return this.http.get(`http://localhost:9000/user/v1/getName/${sessionStorage.getItem("email")}`,reqOption)  
  }




  
  getUserDetailInfo():Observable<any>{
    console.log(localStorage.getItem("Token"))
    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
   let reqOption={headers:httphead}
    return this.http.get(`http://localhost:9000/user/v1/getUserInfo`,reqOption)  
  }
  AddUserDetailInfo(data:any):Observable<any>{
    
    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
   let reqOption={headers:httphead}
    return this.http.post(`http://localhost:9000/user/v1/addUserDetails`,data,reqOption)  
  }
  UpdateUserDetailInfo(data:any):Observable<any>{
    console.log(data)
    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
   let reqOption={headers:httphead}
    return this.http.put(`http://localhost:9000/user/v1/updateUserInfo`,data,reqOption)  
  }
  DeleteUserDetailInfo():Observable<any>{

    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
   let reqOption={headers:httphead}
    return this.http.delete(`http://localhost:9000/user/v1/deleteUserInfo`,reqOption)  
  }


  saveMovieToToList(data:any):Observable<any>{
  console.log(data)
    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
   let reqOption={headers:httphead}
   console.log(reqOption)
   console.log(sessionStorage.getItem("Token"))
    return this.http.post(`http://localhost:9000/user/v1/saveMovieToFavList`,data,reqOption)  
  }





  GetAllUserFavMovies():Observable<any>{
    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
   let reqOption={headers:httphead}
    return this.http.get(`http://localhost:9000/user/v1/getALlUsersFavMovies`,reqOption)  
  }

  deleteOrderfromUser(id:any):Observable<any>{
    
    console.log(id)
    let httphead=new HttpHeaders({
      "Authorization" : "Bearer "+sessionStorage.getItem("Token")
    })
   let reqOption={headers:httphead}
   return this.http.delete(`
   http://localhost:9000/user/v1/deleteFromFavoriteList/${id}`,reqOption)
  }



 

  savePhotoToUserList(data:any):Observable<any>{
    const token = sessionStorage.getItem("Token")
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'image/jpeg');
     return this.http.post(`http://localhost:9000/user/v1/add/pic`,data,{ headers, responseType: 'blob' })  
    }
   getUploadedimage():Observable<any>{
    const token = sessionStorage.getItem("Token")
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'image/jpeg');
   return this.http.get(`http://localhost:9000/user/v1/getprofile/picture`,{ headers, responseType: 'blob' })  
  }
  deletePhoto():Observable<any>{
  //   let httphead=new HttpHeaders({
  //     "Authorization" : "Bearer "+localStorage.getItem("Token")
  //   })
  //  let reqOption={headers:httphead}
  const token = sessionStorage.getItem("Token")
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'image/jpeg');
   return this.http.delete(`http://localhost:9000/user/v1/delete/profilepicture`,{ headers, responseType: 'blob' })  
  }

}
