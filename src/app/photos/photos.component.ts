import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list'
import { debounce, debounceTime, fromEvent, Observable } from 'rxjs';
import { Photo } from '../models/photo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotosService } from './photos.service';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, AfterViewInit {
  @ViewChild('list')
  list!: ElementRef<HTMLDivElement>;

  photos: Photo[] = Array(12).fill(0).map((item, index) => ({ id: `rewaths-photo-${index}`, url: `https://picsum.photos/seed/rewaths-photo-${index}/300` }));

  isLoading = false;
  constructor(private snackBar: MatSnackBar, private photoService: PhotosService) { }
  ngAfterViewInit(): void {

    //this.list.nativeElement.addEventListener('scroll',this.onScroll.bind(this),{passive: true})
  }

  ngOnInit(): void {
    //TODO

  }

  onScroll(event: Event) {
    //how much pixels the list has scrolled from the top
    const scrollTop = (event.target as HTMLElement).scrollTop;
    //difference between total scroll height and visible height
    const offset = (event.target as HTMLElement).scrollHeight - (event.target as HTMLElement).clientHeight;
    console.log('scrolltop', scrollTop);
    console.log('offset', offset);


    //we want to load more items when we are almost at the bottom of the list
    if (Math.abs(offset - scrollTop) < 120) {
      this.loadMore();
    }
  }


  loadMore() {
    console.log('time to load');
    this.isLoading = true;
    const startIndex = this.photos.length;
    //load the next 12 items;
    //simulate network delay between 200-300ms
    setTimeout(() => {
      this.photos.push(...Array(12).fill(0).map((item, index) => ({ id: `rewaths-photo-${startIndex + index}`, url: `https://picsum.photos/seed/rewaths-photo-${startIndex + index}/300` })));
    }, Math.floor(Math.random() * (300 - 200 + 1)) + 200);
  }


  addToFavorites(photo: Photo,) {
    //check if photo is already added
    if (this.photoService.photoExists(photo.id)) {
      this.snackBar.open('This photo is already added', undefined, { duration: 3000 });
      return;
    }

    //store the photos in localstorage
    this.photoService.addToFavorites(photo);
    this.snackBar.open('Added to favorites', undefined, { duration: 3000 });
  }

}
