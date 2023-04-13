import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RandomColorDirective } from './directives/random-color.directive';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { FavoriteStatusDirective } from './directives/favorite-status.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const DIRECTIVES = [RandomColorDirective, FavoriteStatusDirective];

const COMPONENTS = [SpinnerLoadingComponent];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS, PageNotFoundComponent],
  imports: [...MODULES],
  exports: [...MODULES, ...DIRECTIVES, ...COMPONENTS],
})
export class SharedModule {}
