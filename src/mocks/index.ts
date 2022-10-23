import { Injectable } from "@angular/core";
import { Photo } from "src/app/models/photo.model";
import { PhotosService } from "src/app/photos/photos.service";

export const mockFavorites: Photo[] = [{ id: '001', url: 'example.com/photo/001' }, { id: '001', url: 'example.com/photo/001' }];

export const FAKE_LOCALSTORAGE = function () {
  let store: Record<string, any> = {};

  return {
    setItem: (key: string, value: any) => store[key] = value,
    getITem: (key: string) => store[key] as any,
    length: () => 0,
    clear: () => store = {}
  }
}();


@Injectable({
  providedIn: 'root'
})
export class MockPhotosService extends PhotosService {
  constructor() {
    super();
    this.favPhotos = mockFavorites;
  }

  override storeFavPhotosToStore(photos: Photo[]) {
    FAKE_LOCALSTORAGE.setItem('favorites', photos);
  }

  override getFavPhotosFromStore() {
    return FAKE_LOCALSTORAGE.getITem('favorites') as Photo[];
  }

  reset() {
    this.favPhotos = [];
    FAKE_LOCALSTORAGE.clear();
  }
}
