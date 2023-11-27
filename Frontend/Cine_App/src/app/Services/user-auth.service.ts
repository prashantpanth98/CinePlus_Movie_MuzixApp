import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http:HttpClient,private router:Router) { }
  register(data:any):Observable<any>{
  
    return this.http.post(`http://localhost:9000/user/v1/registerUser`,data)  
  }
  helper=new JwtHelperService;
  email: any;
userName:any;

  login(data:any):Observable<any>{
  
    return this.http.post(`http://localhost:8001/user/v/login`,data).pipe(
      map((resp:any)=>{
  
         sessionStorage.setItem("Token",resp.Token);
        const decodeTokens=this.helper.decodeToken(resp.Token);
          this.email=decodeTokens.sub;
          this.userName=decodeTokens.userName;
          sessionStorage.setItem("email",this.email)
          sessionStorage.setItem("userName",this.userName)
        
         }));
 }
 forgotPassword(email:any):Observable<any>{
  return this.http.get(`http://localhost:9000/user/v/forgot/${email}`)  
}
VerifiedOtp(Data:any):Observable<any>{
 
  return this.http.get(`http://localhost:9000/user/v/VerifyOtp/${Data.emailId}/${Data.verifiedOtp}`)  
}
updatePassword(data:any):Observable<any>{
 
  let httphead=new HttpHeaders({
    "Authorization" : "Bearer "+sessionStorage.getItem("Token")
  })
  console.log(sessionStorage.getItem("Token"))
  
 let reqOption={headers:httphead}

  return this.http.put(`http://localhost:8001/user/v/update`,data.newPass,reqOption)  
}
}
