import { TestBed } from '@angular/core/testing';
import { FAKE_LOCALSTORAGE, mockFavorites } from 'src/mocks';
import { LOCAL_STORAGE_FAV_KEY } from '../models/photo.model';

import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotosService);
  });

  afterEach(() => {
    localStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add to favorites', () => {

    spyOn(service, 'storeFavPhotosToStore').and.callThrough();
    service.addToFavorites({ id: '001', url: 'example.com/photo/001' });
    service.addToFavorites({ id: '002', url: 'example.com/photo/002' });

    expect(service.favPhotos.length).toBe(2);
    expect(service.storeFavPhotosToStore).toHaveBeenCalledTimes(2);
  })

  it('shold remove from favorites', () => {
    spyOn(service, 'storeFavPhotosToStore');
    service.addToFavorites({ id: '001', url: 'example.com/photo/001' });
    service.addToFavorites({ id: '002', url: 'example.com/photo/002' });

    expect(service.favPhotos.length).toBe(2);
    expect(service.storeFavPhotosToStore).toHaveBeenCalledTimes(2);

    service.removeFromFavorites('002');
  });

  it('favorites should be empty initially', () => {
    expect(service.favPhotos.length).toBe(0);
  })

  it('previously stored favorites should be loaded from localstorage successfully', () => {
    localStorage.setItem(LOCAL_STORAGE_FAV_KEY, JSON.stringify(mockFavorites));
    const service = new PhotosService();
    expect(service.favPhotos.length).toBeGreaterThan(0);
  })
});
