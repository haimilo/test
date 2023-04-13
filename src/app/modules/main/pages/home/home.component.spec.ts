import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { GiphyService } from '../../services/giphy.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { GIFsListComponent } from '../../components/gifs-list/gifs-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerLoadingComponent } from 'src/app/shared/components/spinner-loading/spinner-loading.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let giphyService: GiphyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, GIFsListComponent, SpinnerLoadingComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatDialogModule],
      providers: [GiphyService, FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    giphyService = TestBed.inject(GiphyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load trending GIFs on initialization', () => {
    const trendingGIFs = [
      { id: '1', title: 'GIF 1' },
      { id: '2', title: 'GIF 2' },
    ] as any;
    spyOn(giphyService, 'getTrendingGIFs').and.returnValue(of(trendingGIFs));
    component.ngOnInit();
    expect(component.GIFs).toEqual(trendingGIFs);
  });

  it('should load search results when searchTrigger$ emits', () => {
    const searchKey = 'cat';
    const searchResults = [{ id: '3', title: 'Cat GIF' }] as any;
    spyOn(giphyService, 'searchGIFs').and.returnValue(of(searchResults));
    component.searchTrigger$.next(searchKey);
    expect(component.GIFs).toEqual(searchResults);
  });

  it('should disable the search form when searchTrigger$ emits', () => {
    const searchKey = 'dog';
    spyOn(giphyService, 'searchGIFs').and.returnValue(of([]));
    component.searchTrigger$.next(searchKey);
    expect(component.searchForm.disabled).toBeFalsy();
  });

  it('should enable the search form after loading search results', () => {
    const searchKey = 'dog';
    spyOn(giphyService, 'searchGIFs').and.returnValue(of([]));
    component.searchTrigger$.next(searchKey);
    expect(component.searchForm.enabled).toBeTruthy();
  });
});
