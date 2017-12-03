import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { ImageCollectionsComponent } from './image-collections/image-collections.component';
import { ImageCollectionService } from './image-collection.service';
import { MycollectionsComponent } from './mycollections/mycollections.component';
import { MycollectionsService } from './mycollections.service';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search.service';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { EditCollectionService } from './edit-collection.service';
import { ViewImagesComponent } from './view-images/view-images.component';
import { ViewImagesService } from './view-images.service';
import { MyImagesComponent } from './my-images/my-images.component';
import { MyImagesService } from './my-images.service';
import { RatingService } from './rating.service';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'image-collections', component: ImageCollectionsComponent },
  { path: 'mycollections', component: MycollectionsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'edit-collections', component: EditCollectionComponent },
  { path: 'view-images', component: ViewImagesComponent },
  { path: 'my-images', component: MyImagesComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'register', component: RegisterComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ImageCollectionsComponent,
    MycollectionsComponent,
    SearchComponent,
    EditCollectionComponent,
    ViewImagesComponent,
    MyImagesComponent,
    PrivacyComponent,
    RegisterComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [LoginService, ImageCollectionService, MycollectionsService, SearchService, EditCollectionService, ViewImagesService, MyImagesService, RatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
