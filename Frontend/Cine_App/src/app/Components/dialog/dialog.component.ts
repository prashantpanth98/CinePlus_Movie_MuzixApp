import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  template: `
   <div style="background-color: black;" >
    <h2 style="color:red" mat-dialog-title>{{ x.title || x.name }}</h2>
   <div style="display: flex; margin-left:10px;">
  
    <div  >
     <img mat-card-image src="https://image.tmdb.org/t/p/w185/{{x.poster_path}}" onerror="https://image.tmdb.org/t/p/w185/./assets/NoImg.png" ><br>
    </div>
    <div style=" margin-left:20px;">
       <span class="language"style="color:white" [ngSwitch]="x.original_language">
       <strong style="color:red">
       Language: </strong>
           <ng-container *ngSwitchCase="'te'">Telugu</ng-container>
           <ng-container *ngSwitchCase="'ta'">Tamil</ng-container>
           <ng-container *ngSwitchCase="'hi'">Hindi</ng-container>
           <ng-container *ngSwitchCase="'ml'">Malayalam</ng-container>
           <ng-container *ngSwitchCase="'kn'">Kannada</ng-container>
           <ng-container *ngSwitchCase="'en'">English</ng-container>
           <ng-container *ngSwitchCase="'de'">German</ng-container>
           <ng-container *ngSwitchCase="'pl'">Polish</ng-container>
           <ng-container *ngSwitchCase="'fi'">Finnish</ng-container>
          <ng-container *ngSwitchCase="'no'">Norwegian</ng-container>
           <ng-container *ngSwitchCase="'fr'">French</ng-container>
           <ng-container *ngSwitchCase="'th'">Thai</ng-container>
           <ng-container *ngSwitchCase="'si'">sinhalese</ng-container>
           <ng-container *ngSwitchCase="'bn'">Bengali</ng-container>
           <ng-container *ngSwitchCase="'pt'">Portuguese</ng-container>
           <ng-container *ngSwitchCase="'or'">Odia/Oriya</ng-container>
           <ng-container *ngSwitchCase="'tr'">Turkesh</ng-container>
           <ng-container *ngSwitchCase="'ja'">Japanese</ng-container>
           <ng-container *ngSwitchCase="'ru'">Russian</ng-container>
           <ng-container *ngSwitchCase="'es'">Spanish</ng-container>
           <ng-container *ngSwitchCase="'sv'">Swedish</ng-container>
           <ng-container *ngSwitchCase="'ms'">Malay</ng-container>
           <ng-container *ngSwitchCase="'tl'">Tagalog</ng-container>


           <ng-container *ngSwitchCase="'cn'">Chinese</ng-container>
           <ng-container *ngSwitchCase="'mr'">Marathi</ng-container>
           <ng-container *ngSwitchCase="'Ko'">Korean</ng-container>
           <ng-container *ngSwitchCase="'it'">Italian</ng-container>
           <ng-container *ngSwitchCase="'id'">Indonesian</ng-container>
      
         </span><br>
         <span style="color:white"><strong style="color:red">Populatity:</strong> {{x.popularity}}</span><br>
         <span style="color:white"><strong style="color:red">Original Name:</strong> {{x.original_title || x.name}}</span><br>
         <span style="color:white"><strong style="color:red">Releasedate:</strong> {{x.release_date}}</span><br>
         <span style="color:white"><strong style="color:red">Rating:</strong> {{x.vote_average}}</span><br>
         <span style="color:white"><strong style="color:red">Overview:</strong><br> {{x.overview}}</span>
       </div>
    
   </div>
    <mat-dialog-actions>
      <button style="color:white" mat-button [mat-dialog-close]="true">Close</button>
    </mat-dialog-actions>
    </div>
  `,
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public x: any) {}
}
