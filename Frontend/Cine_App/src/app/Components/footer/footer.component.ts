import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private route:Router){}
home(){
this.route.navigateByUrl("home")
}
contact(){
this.route.navigateByUrl("contactUs")
}
about(){
this.route.navigateByUrl("about")
}
}
