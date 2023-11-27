import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  hide=true;
  captchaCharacters!: string;
  userInput!: string;
  captchaStatus!: string;
  updatePassword(){
    if (this.userInput === this.captchaCharacters) {
      this.captchaStatus = 'Captcha verification successful. You may proceed.';
      
      this.Userservice.updatePassword(this.updateform.value).subscribe((res)=>{
        if(res){
     
     this.movieser.loginOut();
      this.route.navigateByUrl("/login")
     this.generateCaptcha();
     this.userInput=''
     alert("Your Password has been Updated SuccessFully")
     this.snackBr.open("Your Password has been Updated SuccessFully","check mail",{duration:5000})

    }else{
      
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
  constructor(private formBuilder:FormBuilder,
    private snackBr:MatSnackBar,private route:Router,
    private Userservice:UserAuthService,private movieser:MovieServiceService){this.generateCaptcha()}
  updateform=this.formBuilder.group({
    newPass:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(15)],),
   
    captcha:new FormControl('',[ Validators.required])
  })
  get newPass() {return this.updateform.get("newPass")}
   
   get captcha() {return this.updateform.get("captcha")}
   generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }
    this.captchaCharacters = captcha;
  }
}
