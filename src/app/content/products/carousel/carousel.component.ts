import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ng-shop-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
  animations: [
    trigger('inOutAnimation', [
      transition('void => *', [
        style({ left: '100%', opacity: 0.5 }),
        animate('2s ease-out', style({ left: 0, opacity: 1 })),
      ]),
      transition('* => void', [
        style({ left: 0, opacity: 1 }),
        animate('2s ease-out', style({ left: '-100%', opacity: 0 })),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  public images = [
    {
      src: 'assets/images/default-slide-img.jpg',
      title: 'BEST SPEAKERS DEALS',
    },
    {
      src: 'assets/images/default-slide-img.jpg',
      title: 'BEST SPEAKERS DEALS 111',
    },
    {
      src: 'assets/images/default-slide-img.jpg',
      title: 'BEST SPEAKERS DEALS 222',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
