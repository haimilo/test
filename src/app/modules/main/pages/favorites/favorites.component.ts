import { Component, OnInit } from '@angular/core';
import { GiphyData } from '../../models/GIFs.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  GIFs: GiphyData[];

  constructor() {}

  ngOnInit(): void {
    this.GIFs = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as GiphyData[];
  }
}
