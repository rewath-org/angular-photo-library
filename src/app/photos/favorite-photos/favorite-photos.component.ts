import { Component, OnInit } from '@angular/core';
import {  Photo } from 'src/app/models/photo.model';
import { PhotosService } from '../photos.service';


@Component({
  selector: 'app-favorite-photos',
  templateUrl: './favorite-photos.component.html',
  styleUrls: ['../photos.component.scss', './favorite-photos.component.scss']

})
export class FavoritePhotosComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private photosService: PhotosService) {

    this.photos = this.photosService.favPhotos;
  }

  ngOnInit(): void {
  }

}
