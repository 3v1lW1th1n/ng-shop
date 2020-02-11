import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [CommonModule, MatInputModule],
  exports: [CommonModule, MatInputModule],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
