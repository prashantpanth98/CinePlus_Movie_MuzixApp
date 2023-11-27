import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';

import {MatBadgeModule} from '@angular/material/badge';


import { NgxCaptchaModule } from 'ngx-captcha';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HeaderComponent } from './Components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCommonModule, MatLineModule, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { HomeComponent } from './Components/home/home.component';
import { DialogComponent } from './Components/dialog/dialog.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { FavMoviesComponent } from './Components/fav-movies/fav-movies.component';
import { ViewProfileComponent } from './Components/view-profile/view-profile.component';
import { RecommendationComponent } from './Components/recommendation/recommendation.component';
import { UpdatePasswordComponent } from './Components/update-password/update-password.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FooterComponent } from './Components/footer/footer.component';
// import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
//  import {MatNativeDateModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    DashBoardComponent,
    HomeComponent,
    DialogComponent,
    AboutUsComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    EditProfileComponent,
    FavMoviesComponent,
    ViewProfileComponent,
    RecommendationComponent,
    UpdatePasswordComponent,
    FooterComponent, SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
    MatDividerModule,
    MatCommonModule,
    MatLineModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    MatChipsModule,MatBadgeModule,NgxCaptchaModule,NgxPaginationModule,
    MatExpansionModule,MatButtonToggleModule,MatDatepickerModule,MatNativeDateModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
