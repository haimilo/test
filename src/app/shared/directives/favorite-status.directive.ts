import { Directive, ElementRef, Input } from '@angular/core';
import { GiphyData } from 'src/app/modules/main/models/GIFs.model';

@Directive({
  selector: '[appFavoriteStatus]',
})
export class FavoriteStatusDirective {
  @Input() gif: GiphyData;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.updateFavoriteStatus();

    this.elementRef.nativeElement.addEventListener('click', () => {
      this.updateFavoriteStatus();
    });
  }

  private updateFavoriteStatus() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some((f: any) => f.id === this.gif.id);

    if (isFavorite) {
      this.elementRef.nativeElement.classList.add('redHeart');
    } else {
      this.elementRef.nativeElement.classList.remove('redHeart');
    }
  }
}
