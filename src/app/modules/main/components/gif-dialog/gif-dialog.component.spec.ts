import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { GiphyData } from '../../models/GIFs.model';
import { GIFDialogComponent } from './gif-dialog.component';

describe('GIFDialogComponent', () => {
  let component: GIFDialogComponent;
  let fixture: ComponentFixture<GIFDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GIFDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { gifData: {} as GiphyData } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GIFDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the GIF image', () => {
    const gifUrl = 'https://media.giphy.com/media/abc123/giphy.gif';
    const gifData: GiphyData = {
      id: 'abc123',
      title: 'Test GIF',
      url: 'https://test.com/test.gif',
      images: { downsized: { url: gifUrl } },
    } as any;
    component.data.gifData = gifData;
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toBe(gifUrl);
  });
});
