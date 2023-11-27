import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  captchaCharacters!: string;
  userInput!: string;
  captchaStatus!: string;
 hide=true;
 forgotPassword:boolean=false;
  SendOtp:boolean=false;
  loginform=this.formBuilder.group({
    email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._-]*@(gmail\.com|niit\.com|yahoo\.com)$/)]),
    password: new FormControl("",[Validators.minLength(5),Validators.maxLength(15)]),
    captcha:new FormControl('',[ Validators.required])
  })
  firstName: any;
  lastName: any;
  get email() {return this.loginform.get("email")}
   get password() {return this.loginform.get("password")}
   get captcha() {return this.loginform.get("captcha")}

  generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }
    this.captchaCharacters = captcha;
  }
 
logins:any;
verifyCaptcha(): void {
  if (this.userInput === this.captchaCharacters) {
    this.captchaStatus = 'Captcha verification successful. You may proceed.';
 this.Userservice.login(this.loginform.value).subscribe((res)=>{
  this. logins=this.movieser.loginVerified(sessionStorage.getItem("Token"))

   if(res=this.logins){
    this.movieser.getUserDetailInfo().subscribe((resp)=>{
      
      this.snackBr.open("Welcome To CinemaPlus","Login SuccessFul",{duration:5000})
      
      
      this.route.navigateByUrl("/home")
        },(err:Error)=>{
          
          this.route.navigateByUrl("/home")
          
        this.snackBr.open("Welcome To CinemaPlus","Login SuccessFul",{duration:5000})
       
        })
       
  }else{
     this.route.navigateByUrl("/login")
     this.snackBr.open("Token Is Missing","Sorry",{duration:2000})
   }},(err:Error)=>{
this.snackBr.open(`${err.message.substring(err.message.length-6,err.message.length)}!!`,"Sorry",{
       duration:4000
     })
  
  } )

  } else {
    this.captchaStatus = 'Captcha verification failed. Please try again.';
    this.generateCaptcha();
    this.userInput = ''
  }

}
  constructor(private formBuilder: FormBuilder, private movieser:MovieServiceService, 
    private route :Router,
    private snackBr :MatSnackBar,private Userservice:UserAuthService) {
      this.generateCaptcha();
     }
  ngOnInit(): void {
   
    
  }
 
  forgotPasword(){
    this.forgotPassword= !this.forgotPassword
 }
 Otp(){
this.SendOtp=!this.SendOtp
 }
 verifiedOtp:any;
variable1:any;
 getOtp(){
  
 if(typeof this.verifiedOtp === 'undefined'||this.verifiedOtp==''){
  this.variable1="You Have Not Entered OTP  "
 }else{
  
 if(this.verifiedOtp.toString().length!=4){
 
  this.snackBr.open("OTP is must be  Of 4 digits","OK",{duration:5000})
 }else{
 

  this.variable1=''
  const Data = {verifiedOtp:this.verifiedOtp, emailId: this.emailId};
  this.Userservice.VerifiedOtp(Data).subscribe(res=>{
    console.log(res);
      
    if(res==true){
      this.snackBr.open("please check your email for  password","OK",{duration:5000})
    }else{
      this.snackBr.open("please Enter correct OTP or Enter proper email","OK",{duration:5000})
    }
     
      
    },(err:Error)=>{
   if(err.message.endsWith(" 404 OK")){
    this.snackBr.open("You need To Sign Up ","OK",{duration:5000})
   }if(err.message.endsWith(" 500 OK")){
    this.snackBr.open("Internal server Error ","Error",{duration:5000})
  }
    })
    this.verifiedOtp='';
    this.emailId='';
 }
 }

 }
  emailId:any
  variable:any;
  forgot(){
    if(typeof this.emailId === 'undefined'||this.emailId==''){
       this.variable="Enter registered Email So that OTP is sent  "
    }
    else{
      
  this.variable=''
      this.Userservice.forgotPassword(this.emailId).subscribe(res=>{
        console.log(res);
        if(res==true){
          this.snackBr.open("please check your email Otp Has been sent","OK",{duration:5000})
        }else{
          this.snackBr.open("please Enter correct OTP or Enter proper email","OK",{duration:5000})
        }
      },(err:Error)=>{
        if(err.message.endsWith(" 404 OK")){
         this.snackBr.open("You need To SignUp ","Ok",{duration:5000})
        }if(err.message.endsWith(" 500 OK")){
          this.snackBr.open("Internal server Error ","Error",{duration:5000})
        }
         } )
    }
  }

  

 
  
  
  

}
