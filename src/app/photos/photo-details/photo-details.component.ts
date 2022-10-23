import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Photo } from 'src/app/models/photo.model';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {


  photo?: Photo;

  constructor(private route: ActivatedRoute, private photoService: PhotosService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(query => {
      this.photo = this.photoService.findPhotoById(query['id']);
    })
  }

  removeFromFavorites() {
    this.photoService.removeFromFavorites(this.photo!.id);
    this.snackBar.open('Removed from favorites', undefined, { duration: 3000 });
  }
}
