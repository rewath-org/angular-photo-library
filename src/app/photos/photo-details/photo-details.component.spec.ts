import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PhotoDetailsComponent } from './photo-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PhotosService } from '../photos.service';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MockPhotosService } from 'src/mocks';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      declarations: [PhotoDetailsComponent],
      providers: [{ provide: PhotosService, useClass: MockPhotosService },
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: '001' })
        }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking on Remove from favorites  should call "removeFromFavorites method', () => {
    spyOn(component, 'removeFromFavorites').and.callThrough();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(component.removeFromFavorites).toHaveBeenCalled();
  })
});
