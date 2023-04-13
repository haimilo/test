import { TestBed, ComponentFixture } from '@angular/core/testing';
import { GiphyService } from '../../services/giphy.service';
import { UploadGIFResponse } from '../../models/GIFs.model';
import {
  FileWithProgress,
  UploadGifComponent,
} from '../upload-gif/upload-gif.component';

describe('UploadGifComponent', () => {
  let component: UploadGifComponent;
  let fixture: ComponentFixture<UploadGifComponent>;
  let giphyService: jasmine.SpyObj<GiphyService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GiphyService', ['uploadGIF']);
    TestBed.configureTestingModule({
      declarations: [UploadGifComponent],
      providers: [{ provide: GiphyService, useValue: spy }],
    }).compileComponents();
    fixture = TestBed.createComponent(UploadGifComponent);
    component = fixture.componentInstance;
    giphyService = TestBed.inject(GiphyService) as jasmine.SpyObj<GiphyService>;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onUploadFile', () => {
    it('should upload the file and set the gifId on success', () => {
      const response: UploadGIFResponse = { data: { id: 'gif-id' } };
      giphyService.uploadGIF.and.returnValue({
        pipe: () => ({ subscribe: (success: any) => success(response) }),
      } as any);
      component.file = new FileWithProgress([new Blob()], 'test.gif');
      component.onUploadFile();
      expect(component.isLoading).toBeTrue();
      expect(component.gifId).toEqual('gif-id');
    });

    it('should clear the gifId on error', () => {
      giphyService.uploadGIF.and.returnValue({
        pipe: () => ({ subscribe: (_: any, error: any) => error() }),
      } as any);
      component.file = new FileWithProgress([new Blob()], 'test.gif');
      component.onUploadFile();
      expect(component.isLoading).toBeTrue();
      expect(component.gifId).toEqual('');
    });
  });

  describe('onFileSelected', () => {
    it('should set the error message if the file size is too large', () => {
      const event = { target: { files: [{ size: 101 * 1024 * 1024 }] } };
      component.onFileSelected(event);
      expect(component.errorMessage).toEqual('Maximum file size is 100MB');
    });

    it('should load the file if the size is valid', () => {
      const event = { target: { files: [{ size: 99 * 1024 * 1024 }] } };
      spyOn(component, 'loadFile');
      component.onFileSelected(event);
      expect(component.errorMessage).toEqual('');
      expect(component.loadFile).toHaveBeenCalled();
    });
  });
});
