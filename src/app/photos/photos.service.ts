import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_FAV_KEY, Photo, } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
//This service is used to temporary hold the fav photos from localstorage
export class PhotosService {
  favPhotos: Photo[] = [];

  constructor() {
    this.favPhotos = this.getFavPhotosFromStore();
  }

  photoExists(id: string) {
    return !!this.findPhotoById(id);
  }


  addToFavorites(photo: Photo) {
    this.favPhotos.push(photo);
    this.storeFavPhotosToStore(this.favPhotos);
  }

  removeFromFavorites(id: string) {
    this.favPhotos = this.favPhotos.filter(photo => photo.id !== id);
    this.storeFavPhotosToStore(this.favPhotos);
  }

  findPhotoById(id: string) {
    return this.favPhotos.find(photo => photo.id === id);
  }

  getFavPhotosFromStore() {
    //load saved photos from localstorage
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAV_KEY) as string) ?? [] as Photo[];
  }


  storeFavPhotosToStore(photos: Photo[]) {
    localStorage.setItem(LOCAL_STORAGE_FAV_KEY, JSON.stringify(photos));
  }
}
