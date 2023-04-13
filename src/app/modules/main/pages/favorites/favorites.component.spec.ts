import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { GIFsListComponent } from '../../components/gifs-list/gifs-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent, GIFsListComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize GIFs with favorites from local storage', () => {
    localStorage.setItem(
      'favorites',
      JSON.stringify([
        { id: '1', title: 'GIF 1', images: { original: { url: 'url1' } } },
        { id: '2', title: 'GIF 2', images: { original: { url: 'url2' } } },
      ])
    );
    component.ngOnInit();
    expect(component.GIFs.length).toEqual(2);
    expect(component.GIFs[0]).toEqual({
      id: '1',
      title: 'GIF 1',
      images: { original: { url: 'url1' } },
    } as any);
    expect(component.GIFs[1]).toEqual({
      id: '2',
      title: 'GIF 2',
      images: { original: { url: 'url2' } },
    } as any);
  });
});
