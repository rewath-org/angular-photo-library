import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { FavoritePhotosComponent } from './favorite-photos/favorite-photos.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotosRoutingModule } from './photos-routing.modue';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [
    PhotosComponent,
    FavoritePhotosComponent,
    PhotoDetailsComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    MatGridListModule
  ]
})
export class PhotosModule { }
