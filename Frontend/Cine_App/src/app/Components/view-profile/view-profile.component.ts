import { Component } from '@angular/core';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {

 
 
 
constructor(private movieservice:MovieServiceService,
  private  snacbar:MatSnackBar,private route:Router){}
firstName: any;
    lastName: any;
     age: any;
    gender:any;
    address: any;
      profilePic: any;
       mobileNo:any;
email:any;
ngOnInit(){
this.movieservice.getUserDetailInfo().subscribe((resp)=>{
this.address=resp.address;
this.firstName=resp.firstName;
this.lastName=resp.lastName;
//  this.age=resp.age;
this.gender=resp.gender;
this.email=sessionStorage.getItem("email");
    this.mobileNo=resp.mobileNo;
})
this.getUploadedimage()
this.getdob();

}
DeleteUserDetailInfo(){
  
}

uploadImage(fileInput: any){
 const formData = new FormData();
    formData.append('image', fileInput.files[0]);

 this.movieservice.savePhotoToUserList(formData).subscribe((res)=>{
     if(res){
      location.reload()
     this.snacbar.open("Profile Pic Has been Uploaded","successsfully",{duration:5000})
    this.route.navigateByUrl("viewprofile");
    } 
    },(err:Error)=>{
      this.snacbar.open(`${err.message.substring(err.message.length-6,err.message.length)}!!`,"Sorry",{
             duration:4000})})
}
imageSrc!: string;
getUploadedimage(){
this.movieservice.getUploadedimage().subscribe(
  (response: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(response);
  },
  (error) => {
    console.log(error.status);
    if(error.status==404){
this.snacbar.open("No image is Available","click to upload",{duration:5000})
    } }

);

}
getdob(){
  this.movieservice.getdob().subscribe((resp)=>{
    if(resp){
      alert(1)
      if(resp.status=200){
        
        this.age=resp;
       
      }
     
     
    } 
    },(err:any)=>{
       this.age=err.error.text
 })
}

deletePhoto(){
  this.movieservice.deletePhoto().subscribe((resp)=>{
    if(resp){
      location.reload()
     this.snacbar.open("Profile Pic Has been Deleted","successsfully",{duration:5000})
    this.route.navigateByUrl("viewprofile");
    } 
    },(err:Error)=>{
      this.snacbar.open(`${err.message.substring(err.message.length-6,err.message.length)}!!`,"Sorry",{
             duration:4000})})
}


}
