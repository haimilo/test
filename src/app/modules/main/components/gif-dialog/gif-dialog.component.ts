import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiphyData } from '../../models/GIFs.model';

@Component({
  selector: 'app-gif-dialog',
  templateUrl: './gif-dialog.component.html',
  styleUrls: ['./gif-dialog.component.scss'],
})
export class GIFDialogComponent {
  loading: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { gifData: GiphyData }) {}

  onImageLoad() {
    this.loading = false;
  }
}
