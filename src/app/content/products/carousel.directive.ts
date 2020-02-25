import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngShopCarousel]',
})
export class CarouselDirective implements OnInit {
  @Input()
  public appExchangeRates: any;

  @Input('ngShopCarouselFrom')
  public images: { src: string; title: string }[] = [];

  @Input('ngShopCarouselDelay')
  public ms: number = 5000;

  @Input('ngShopCarouselAutoplay')
  public set playAuto(mode: 'on' | 'off') {
    if (!mode) {
      return;
    }
    this.autoplay = mode;
  }

  public autoplay: 'on' | 'off' = 'on';
  public context: any;
  public index: number = 0;

  private intervalID!: number;

  public constructor(
    private readonly tpl: TemplateRef<any>,
    private readonly vcr: ViewContainerRef,
  ) {}

  public ngOnInit(): void {
    this.context = {
      $implicit: this.images[this.index],
      controller: {
        next: () => this.next(),
        prev: () => this.prev(),
      },
    };
    this.vcr.createEmbeddedView(this.tpl, this.context);
    this.resetInterval();
  }

  public next(): void {
    this.resetInterval();
    this.index++;
    if (this.index >= this.images.length) {
      this.index = 0;
    }
    this.context.$implicit = this.images[this.index];
  }

  public prev(): void {
    this.resetInterval();
    this.index--;
    if (this.index < 0) {
      this.index = this.images.length - 1;
    }
    this.context.$implicit = this.images[this.index];
  }

  private resetInterval(): void {
    if (this.autoplay !== 'on') {
      return;
    }
    this.clearInterval().initInterval();
  }

  private initInterval(): void {
    this.intervalID = setInterval(() => {
      this.next();
    }, this.ms);
  }

  private clearInterval(): CarouselDirective {
    clearInterval(this.intervalID);
    return this;
  }
}
