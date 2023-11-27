import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  protected registration!: FormGroup;
  ngOnInit() {
    this.registration = this.formBuilder.group({
      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._-]*@(gmail\.com|niit\.com|yahoo\.com)$/)]),
      recaptcha: new FormControl('',[ Validators.required]),
      name: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(/^[ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz]/)]),
    
      age: ['', [Validators.required]]
     

    });
    
  }
  siteKey:string="6Lfc8-MmAAAAALB6x-e9DvP7oAk-iiGyiKH5EvBF";

  get email() {return this.registration.get("email")}
  get recaptcha() {return this.registration.get("recaptcha")}
   get  age() {return this.registration.get("age")}
  get name() {return this.registration.get("name")}
 

 

 














  isValidAge:any;
  dob1: any | null = null;
  validateAge() {

    if (this.dob1) {
      const currentDate = new Date();
      const inputDate = new Date(this.dob1);
      const ageTime = currentDate.getTime() - inputDate.getTime();
      const age = Math.floor(ageTime / (1000 * 60 * 60 * 24 * 365.25)); // approximate calculation
      if (age >13 && age < 100) {
        this.isValidAge = true;
      } else {
        this.isValidAge = false;
      }
    } else {
      this.isValidAge = null;
    }
  }
  








 constructor(
   private fb:FormBuilder,private route : Router,
  private snackBr:MatSnackBar,
   private Userservice:UserAuthService,private formBuilder:FormBuilder){
    
   }
 isLoggedIn=false;
 

submit() {
  const data = this.registration.value;
  
  console.log(data)
  console.log(data.dob)
  this.Userservice.register(data).subscribe((res)=>{
    console.log(res)
    if(res.status==208){
      this.snackBr.open("Email Already Exist You mean Login","Try with Another",{duration:5000})
    }else{
      this.route.navigateByUrl("login")
      this.snackBr.open("Congratulation!!!! check Mail for Password ","SignUp Successfull",{duration:2000})
      
    }}
    ,(err:Error)=>{
     
        this.snackBr.open(`${err.message}!!`,"Sorry",{
          duration:4000})}
          )
}

signin(){
 this.route.navigateByUrl("login")
}
}
