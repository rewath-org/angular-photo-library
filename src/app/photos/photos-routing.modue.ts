import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritePhotosComponent } from './favorite-photos/favorite-photos.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotosComponent } from './photos.component';

const routes: Routes = [{
  path: '',
 component: PhotosComponent,
},
{
    path:'favorites',
    component: FavoritePhotosComponent
},
{
    path: 'photos/:id',
    component: PhotoDetailsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
