import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadGifComponent, FileWithProgress } from './upload-gif.component';
import { GiphyService } from '../../services/giphy.service';
import { UploadGIFResponse } from '../../models/GIFs.model';
import { of } from 'rxjs';

describe('UploadGifComponent', () => {
  let component: UploadGifComponent;
  let fixture: ComponentFixture<UploadGifComponent>;
  let giphyService: jasmine.SpyObj<GiphyService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GiphyService', ['uploadGIF']);

    TestBed.configureTestingModule({
      declarations: [UploadGifComponent],
      providers: [{ provide: GiphyService, useValue: spy }],
    });

    fixture = TestBed.createComponent(UploadGifComponent);
    component = fixture.componentInstance;
    giphyService = TestBed.inject(GiphyService) as jasmine.SpyObj<GiphyService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onUploadFile', () => {
    it('should upload the file and set the gifId', () => {
      const file = new FileWithProgress(['test'], 'test.gif');
      const response = { data: { id: '123' } } as UploadGIFResponse;
      giphyService.uploadGIF.and.returnValue(of(response));

      component.file = file;
      component.onUploadFile();

      expect(giphyService.uploadGIF).toHaveBeenCalledWith(file);
      expect(component.isLoading).toBeFalse();
      expect(component.gifId).toBe('123');
    });

    it('should not set the gifId if there is an error', () => {
      const file = new FileWithProgress(['test'], 'test.gif');
      giphyService.uploadGIF.and.returnValue(of());

      component.file = file;
      component.onUploadFile();

      expect(giphyService.uploadGIF).toHaveBeenCalledWith(file);
      expect(component.isLoading).toBeFalse();
      expect(component.gifId).toBe('');
    });
  });

  describe('onFileSelected', () => {
    it('should set the selected file and call loadFile', () => {
      const file = new File(['test'], 'test.gif', {
        type: 'image/gif',
      });
      const event = { target: { files: [file] } };
      const loadFileSpy = spyOn(component, 'loadFile');

      component.onFileSelected(event);

      expect(component.file).toBeInstanceOf(FileWithProgress);
      expect(component.errorMessage).toBe('');
      if (component.file) {
        expect(loadFileSpy).toHaveBeenCalledWith(component.file);
      }
    });

    it('should set an error message if the file size is too large', () => {
      const file = new File(['test'], 'test.gif', { type: 'image/gif' });
      Object.defineProperty(file, 'size', { value: 100 * 1024 * 1024 + 1 });
      const event = { target: { files: [file] } };

      component.onFileSelected(event);

      expect(component.errorMessage).toBe('Maximum file size is 100MB');
    });
  });

  it('should remove file', () => {
    // set a file to component
    const file = new FileWithProgress([], 'test.gif');
    component.file = file;

    // call removeFile method
    component.removeFile(file);

    // assert file is removed
    expect(component.file).toBeNull();
  });

  it('should return file size with unit', () => {
    // test for file size less than 1KB
    expect(component.getFileSize(1023)).toEqual('1023.0 B');

    // test for file size in KB
    expect(component.getFileSize(1024 * 500)).toEqual('500.0 KB');

    // test for file size in MB
    expect(component.getFileSize(1024 * 1024 * 750)).toEqual('750.0 MB');

    // test for file size in GB
    expect(component.getFileSize(1024 * 1024 * 1024 * 2.5)).toEqual('2.5 GB');

    // test for file size in TB
    expect(component.getFileSize(1024 * 1024 * 1024 * 1024 * 1.5)).toEqual(
      '1.5 TB'
    );
  });
});
