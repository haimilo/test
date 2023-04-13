import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GiphyData } from '../../models/GIFs.model';
import { GiphyService } from '../../services/giphy.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GIFDialogComponent } from '../gif-dialog/gif-dialog.component';

@Component({
  selector: 'app-gifs-list',
  templateUrl: './gifs-list.component.html',
  styleUrls: ['./gifs-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GIFsListComponent implements OnChanges {
  @Input() GIFs: GiphyData[];
  @Input() isLoading: boolean;

  gifLoaded: { [key: string]: boolean } = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private giphyService: GiphyService,
    public dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['GIFs']?.previousValue?.length === 0) {
      this.gifLoaded = {};
    }
  }

  openDialog(gif: GiphyData) {
    this.dialog.open(GIFDialogComponent, {
      hasBackdrop: true,
      backdropClass: 'mat-dialog-backdrop-blur',
      data: { gifData: gif },
    });
  }

  trackByFn(index: number, item: GiphyData): string {
    return item.id;
  }

  onGifLoad(gifId: string): void {
    this.gifLoaded[gifId] = true;
  }

  onAddToFavorites(selectedGIF: GiphyData) {
    this.giphyService.toggleFavorite(selectedGIF);
  }
}
