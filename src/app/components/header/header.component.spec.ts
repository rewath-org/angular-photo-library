import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { RouterTestingModule, } from '@angular/router/testing';
import { Location } from '@angular/common'
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';



@Component({ selector: 'favs', template: '<h2>it works</h2' })
class FakeFavoritesComponent {

}

@Component({ selector: 'photos', template: '<h2>it works</h2' })
class FakePhotosComponent {

}



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{path: '', component: FakePhotosComponent},{path: 'favorites', component: FakeFavoritesComponent}]), MatCardModule],
      declarations: [HeaderComponent]
    })
      .compileComponents();


    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(HeaderComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when navigating to photos it should take to /', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));

  it('when navigating to favorites it should take to /favorites', fakeAsync(() => {
    router.navigate(['favorites']);
    tick();
    expect(location.path()).toBe('/favorites');
  }));

});
