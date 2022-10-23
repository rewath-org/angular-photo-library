import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cleanupSubject: Subject<null> = new Subject();

  activeRoute: 'favorites' | 'photos' | undefined = 'photos';

  constructor() { }


  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }

}
