import { Component, OnDestroy } from '@angular/core';
import { GiphyService } from '../../services/giphy.service';
import { UploadGIFResponse } from '../../models/GIFs.model';
import { Subject, finalize, takeUntil } from 'rxjs';

export class FileWithProgress extends File {
  public progress: number = 0;
  public loaded: boolean = false;
}

@Component({
  selector: 'app-upload-gif',
  templateUrl: './upload-gif.component.html',
  styleUrls: ['./upload-gif.component.scss'],
})
export class UploadGifComponent implements OnDestroy {
  file: FileWithProgress | null;
  errorMessage = '';
  isLoading = false;
  gifId = '';

  private readonly onDestroy = new Subject<void>();

  constructor(private giphyService: GiphyService) {}

  onUploadFile(): void {
    if (this.file) {
      this.isLoading = true;
      this.giphyService
        .uploadGIF(this.file)
        .pipe(
          finalize(() => (this.isLoading = false)),
          takeUntil(this.onDestroy)
        )
        .subscribe(
          (response: UploadGIFResponse) => {
            this.gifId = response.data?.id;
          },
          () => {
            this.gifId = '';
          }
        );
    }
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile.size > 100 * 1024 * 1024) {
      this.errorMessage = 'Maximum file size is 100MB';
      return;
    }

    this.gifId = '';
    this.errorMessage = '';

    const fileWithProgress = new FileWithProgress(
      [selectedFile],
      selectedFile.name
    );
    this.file = fileWithProgress;
    this.loadFile(fileWithProgress);
  }

  loadFile(file: FileWithProgress): void {
    file.progress = 0;

    const reader = new FileReader();

    reader.onload = () => {
      file.progress = 100;
      setTimeout(() => {
        file.loaded = true;
      }, 500);
    };

    reader.onprogress = (event: ProgressEvent<FileReader>) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        file.progress = Math.round(progress);
      }
    };

    reader.readAsDataURL(file);
  }

  removeFile(file: FileWithProgress): void {
    if (this.isLoading) {
      return;
    }
    this.file = null;
    const inputEl = document.getElementById('file-input') as HTMLInputElement;
    if (inputEl) {
      inputEl.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    if (this.isLoading) {
      return;
    }
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []);
    const fileWithProgress = files[0] as FileWithProgress;
    fileWithProgress.progress = 0;
    this.file = fileWithProgress;
    this.loadFile(fileWithProgress);
  }

  getFileSize(size: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
