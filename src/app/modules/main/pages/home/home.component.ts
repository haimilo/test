import {
  fromEvent,
  filter,
  throttleTime,
  switchMap,
  tap,
  Subject,
  takeUntil,
  catchError,
  of,
  distinctUntilChanged,
} from 'rxjs';
import { GiphyData } from '../../models/GIFs.model';
import { GiphyService } from '../../services/giphy.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gifsContainer') gifsContainer!: ElementRef;
  GIFs: GiphyData[] = [];
  isLoading = false;
  offset = 0;
  searchForm: FormGroup;
  title = '';
  readonly getList = new Subject<void>();

  searchTrigger$ = new Subject<string>();
  private readonly onDestroy = new Subject<void>();

  constructor(
    private giphyService: GiphyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchKey: [''],
    });

    this.searchTrigger$
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          this.offset = 0;
          this.isLoading = true;
          this.searchForm.disable();
          this.GIFs = [];
        }),
        switchMap((searchKey: string) => {
          return searchKey
            ? this.giphyService.searchGIFs(searchKey, this.offset)
            : this.giphyService.getTrendingGIFs(this.offset);
        }),
        catchError((err) => {
          return of([]);
        }),
        takeUntil(this.onDestroy)
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.searchForm.enable();
        this.GIFs = res;
      });

    this.searchTrigger$.next('');
  }

  ngAfterViewInit(): void {
    const scroll$ = fromEvent(this.gifsContainer.nativeElement, 'scroll');
    scroll$
      .pipe(
        takeUntil(this.onDestroy),
        filter(() => this.isScrolledToBottom() && !this.isLoading),
        throttleTime(500),
        tap(() => {
          this.offset += 25;
          this.isLoading = true;
        }),
        switchMap(() => {
          const searchKey = this.searchForm?.get('searchKey')?.value;
          return searchKey
            ? this.giphyService.searchGIFs(searchKey, this.offset)
            : this.giphyService.getTrendingGIFs(this.offset);
        }),
        catchError((err) => {
          return of([]);
        })
      )
      .subscribe((res) => {
        this.GIFs = this.GIFs.concat(res);
        this.isLoading = false;
      });
  }

  onSearch(): void {
    const searchKey = this.searchForm?.get('searchKey')?.value;
    this.title = searchKey;
    this.searchTrigger$.next(searchKey);
  }

  isScrolledToBottom(): boolean {
    const nativeElement = this.gifsContainer.nativeElement;
    return (
      nativeElement.scrollHeight <=
      nativeElement.scrollTop + nativeElement.clientHeight + 1
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
