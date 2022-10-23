import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { FavoritePhotosComponent } from './favorite-photos/favorite-photos.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotosRoutingModule } from './photos-routing.modue';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PhotosComponent,
    FavoritePhotosComponent,
    PhotoDetailsComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class PhotosModule { }
