import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { GiphyData } from '../../models/GIFs.model';
import { GiphyService } from '../../services/giphy.service';
import { GIFDialogComponent } from '../gif-dialog/gif-dialog.component';
import { GIFsListComponent } from './gifs-list.component';

describe('GIFsListComponent', () => {
  let component: GIFsListComponent;
  let fixture: ComponentFixture<GIFsListComponent>;
  let giphyService: jasmine.SpyObj<GiphyService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const giphyServiceSpy = jasmine.createSpyObj('GiphyService', [
      'toggleFavorite',
    ]);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [GIFsListComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: GiphyService, useValue: giphyServiceSpy },
      ],
    }).compileComponents();

    giphyService = TestBed.inject(GiphyService) as jasmine.SpyObj<GiphyService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GIFsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog when openDialog is called', () => {
    const gif: GiphyData = {
      id: '1234',
      title: 'test gif',
      images: {
        fixed_height: { url: 'http://testurl.com' },
      },
    } as any;
    component.openDialog(gif);
    expect(dialog.open).toHaveBeenCalledWith(GIFDialogComponent, {
      hasBackdrop: true,
      backdropClass: 'mat-dialog-backdrop-blur',
      data: { gifData: gif },
    });
  });

  it('should toggle favorite when onAddToFavorites is called', () => {
    const gif: GiphyData = {
      id: '1234',
      title: 'test gif',
      images: {
        fixed_height: { url: 'http://testurl.com' },
      },
    } as any;
    component.onAddToFavorites(gif);
    expect(giphyService.toggleFavorite).toHaveBeenCalledWith(gif);
  });

  it('should set gifLoaded when onGifLoad is called', () => {
    component.onGifLoad('1234');
    expect(component.gifLoaded['1234']).toBeTrue();
  });

  it('should return the id when trackByFn is called', () => {
    const gif: GiphyData = {
      id: '1234',
      title: 'test gif',
      images: {
        fixed_height: { url: 'http://testurl.com' },
      },
    } as any;
    const result = component.trackByFn(0, gif);
    expect(result).toEqual(gif.id);
  });
});
