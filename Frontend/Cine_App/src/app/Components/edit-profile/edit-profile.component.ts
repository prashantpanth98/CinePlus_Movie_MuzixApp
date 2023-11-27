import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/Services/movie-service.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private fb:FormBuilder,
    private movieservice:MovieServiceService,
    private snackBr:MatSnackBar,private route:Router){}
  editProfile=this.fb.group({
    firstName: ['', [Validators.required,Validators.minLength(3),Validators.pattern(/^[ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz]/)]],
    lastName: ['', [Validators.required,Validators.minLength(3)],Validators.pattern(/^[ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz]/)],
    gender: ['', [Validators.required]],
    // age:['', [Validators.required]],
    address: ['', [Validators.required,Validators.minLength(5)]],
    mobileNo:['', [Validators.required, Validators.pattern(/^[789]\d{9,9}$/)]]
 })
 get firstName() { return this.editProfile.get("firstName") }
 get gender(){return this.editProfile.get("gender")}
 get lastName() { return this.editProfile.get("lastName") }
//  get age() { return this.editProfile.get("age") }
 get address() { return this.editProfile.get("address") }
 get mobileNo() { return this.editProfile.get("mobileNo") }
user:any;
AddForm() {
  
    console.log(this.editProfile.value);
    this.movieservice.AddUserDetailInfo(this.editProfile.value).subscribe((resp)=>{
      if(resp){
        
        this.route.navigateByUrl("viewprofile")
        
        this.snackBr.open("Your Information  has Added ","Successfully",{duration:5000})
      
      }else{
        this.route.navigateByUrl("editprofile")
        this.snackBr.open("Your Information  hasNot Added ","sorry",{duration:2000})
        
      }},(err:Error)=>{
        this.snackBr.open(`${err.message.substring(err.message.length-6,err.message.length)}!!`,"Sorry",{
               duration:4000})})
      
}
ngOnInit() {
  this.editProfile = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]],
    gender: ['', [Validators.required]],
    // age: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    mobileNo: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]]
  });
  this.fetchUserData();
}
disableAdd:Boolean=false;
disableUpdate:Boolean=false;
fetchUserData() {
  this.movieservice.getUserDetailInfo().subscribe(
    (userData) => {
      this.editProfile.patchValue(userData);
     this.disableUpdate=true;
    },
    (error) => {
      console.log('Error fetching user data:', error);
      this.disableAdd=true;
    }
  );
}
  
  UpdateForm(){
    
    this.movieservice.UpdateUserDetailInfo(this.editProfile.value).subscribe((resp)=>{
      if(resp){

        this.route.navigateByUrl("viewprofile")
        this.snackBr.open("Your Information  has Updated ","Successfully",{duration:5000})
      }else{
        this.route.navigateByUrl("editprofile")
        this.snackBr.open("Your Information  hasNot Updated ","sorry",{duration:2000})
        
      }},(err:Error)=>{
        this.snackBr.open(`${err.message.substring(err.message.length-6,err.message.length)}!!`,"Sorry",{
               duration:4000})})
  }
}
