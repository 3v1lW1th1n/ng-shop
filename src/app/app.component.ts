import { Component } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { customTransition } from './router.animation';


@Component({
  selector: 'ng-shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [customTransition],
})
export class AppComponent {
  public getRouterState(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
  }
}
