import { ComponentFixture, TestBed, async, tick, fakeAsync, flush } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockPhotosService } from 'src/mocks';

import { PhotosComponent } from './photos.component';
import { PhotosService } from './photos.service';

describe('PhotosComponent', () => {
  let fixture: ComponentFixture<PhotosComponent>;
  let component: PhotosComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatButtonModule,
        MatCardModule],
      declarations: [PhotosComponent],
      providers: [{ provide: PhotosService, useClass: MockPhotosService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    //fixture.destroy();
    localStorage.clear();
    const service = TestBed.inject(PhotosService) as MockPhotosService;
    service.reset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('clicking on a photo should add to favorites', () => {
    const fixture = TestBed.createComponent(PhotosComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'addToFavorites').and.callThrough();

    const photoDebugEls = fixture.debugElement.queryAll(By.css('mat-grid-tile'));

    photoDebugEls[1].triggerEventHandler('click');


    fixture.whenStable().then(() => {
      expect(component.addToFavorites).toHaveBeenCalled();
    });
  })

  it('clicking on the same photo should not add twice to favorites', () => {

    const service = TestBed.inject(PhotosService);
    fixture.detectChanges();

    const addToFavoritesComponentSpy = spyOn(component, 'addToFavorites').and.callThrough();
    const addToFavoritesServiceSpy = spyOn(service, 'addToFavorites').and.callThrough();


    const photoDebugEls = fixture.debugElement.queryAll(By.css('mat-grid-tile'));
    photoDebugEls[0].triggerEventHandler('click');
    fixture.detectChanges();


    expect(addToFavoritesComponentSpy).toHaveBeenCalledTimes(1);
    expect(addToFavoritesServiceSpy).toHaveBeenCalled();


    addToFavoritesComponentSpy.calls.reset();
    addToFavoritesServiceSpy.calls.reset();


    photoDebugEls[0].triggerEventHandler('click');
    fixture.detectChanges();
    expect(addToFavoritesComponentSpy).toHaveBeenCalledTimes(1);
    expect(addToFavoritesServiceSpy).not.toHaveBeenCalled();

  })

  it('should load more photos when the list is scrolled to the bottom', fakeAsync(() => {
    spyOn(component, 'loadMore').and.callThrough();
    const compiled = fixture.nativeElement as HTMLElement;
    const list = compiled.querySelector('.list-container');

    const debugEl = fixture.debugElement.query(By.css('.list-container'));
    debugEl.triggerEventHandler('scroll', { target: { scrollTop: 500, scrollHeight: 1000, clientHeight: 600 } });
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.loadMore).toHaveBeenCalled();
    })
    flush();
  }));
});
