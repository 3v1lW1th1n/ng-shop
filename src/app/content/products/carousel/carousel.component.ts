import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-shop-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
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
  constructor() {}

  ngOnInit(): void {}
}
