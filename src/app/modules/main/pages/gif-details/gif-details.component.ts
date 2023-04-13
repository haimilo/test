import { GiphyService } from './../../services/giphy.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { GiphyData } from '../../models/GIFs.model';

@Component({
  selector: 'app-gif-details',
  templateUrl: './gif-details.component.html',
  styleUrls: ['./gif-details.component.scss'],
})
export class GifDetailsComponent implements OnInit, OnDestroy {
  gifId: string | null;
  isLoading = false;
  gifLoaded = false;
  gifData: GiphyData | null;

  private readonly onDestroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private giphyService: GiphyService
  ) {}

  ngOnInit() {
    this.gifId = this.route.snapshot.paramMap.get('id');
    if (this.gifId) {
      this.isLoading = true;
      this.giphyService
        .getGIFbyId(this.gifId)
        .pipe(
          finalize(() => (this.isLoading = false)),
          takeUntil(this.onDestroy)
        )
        .subscribe(
          (res) => (this.gifData = res),
          () => {
            this.gifData = null;
          }
        );
    }
  }

  onGifLoad(): void {
    this.gifLoaded = true;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
