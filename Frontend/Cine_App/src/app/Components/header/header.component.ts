import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/Services/movie-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  panelOpenState = false;




 
  userName!:any;
  
  ngOnInit(){
 
this.getUploadedimage()
 this.getName()
// this.userName=sessionStorage.getItem("userName")
    }
signIn() {
  this.route.navigateByUrl("/login")
}
editProfile() {
  this.route.navigateByUrl("/editprofile")
}
viewProfile() {
 this.route.navigateByUrl("/viewprofile")
}
UpdatedPassword(){
  this.route.navigateByUrl("/updatePass")
}
signOut() {

  this.movieser.loginOut();
  this.route.navigateByUrl("/")
}
constructor(



  private movieser:MovieServiceService,
  private route:Router,private snackbar:MatSnackBar) {}
 
  
  isLoggedIn=this.movieser.loginVerified(sessionStorage.getItem("Token"))
  
  imageSrc!: string;
getUploadedimage(){
this. movieser.getUploadedimage().subscribe(
  (response: Blob) => {
    console.log(response)
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(response);
  },
  (error) => {
    console.log(error.status);
    if(error.status==404){
this.snackbar.open("No image is Available","click to upload",{duration:5000})
    } }

);

}
getName(){
  this. movieser.getName().subscribe((resp)=>{
    if(resp){
      alert(1)
      if(resp.status=200){
        
        this.userName=resp;
       
      }
     
     
    } 
    },(err:any)=>{
       this.userName=err.error.text
 })
}

}
