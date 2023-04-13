import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GIFsListComponent } from './components/gifs-list/gifs-list.component';
import { GIFDialogComponent } from './components/gif-dialog/gif-dialog.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { UploadGifComponent } from './pages/upload-gif/upload-gif.component';
import { GifDetailsComponent } from './pages/gif-details/gif-details.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    GIFsListComponent,
    GIFDialogComponent,
    SideBarComponent,
    FavoritesComponent,
    UploadGifComponent,
    GifDetailsComponent,
  ],
  imports: [SharedModule, CommonModule, MainRoutingModule],
})
export class MainModule {}
