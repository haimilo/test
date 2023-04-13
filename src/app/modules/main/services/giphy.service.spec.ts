import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GiphyService } from './giphy.service';
import { API_ENDPOINT, API_KEY, BASE_URL } from 'src/app/core/base-url/APIs';

describe('GiphyService', () => {
  let service: GiphyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GiphyService],
    });

    service = TestBed.inject(GiphyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get trending GIFs', () => {
    const offset = 0;
    service.getTrendingGIFs(offset).subscribe((gifs) => {
      expect(gifs.length).toBe(25);
    });

    const req = httpTestingController.expectOne(
      `${API_ENDPOINT.TRENDING_GIFS}&offset=${offset}&limit=25`
    );
    expect(req.request.method).toEqual('GET');

    req.flush({ data: Array(25).fill({}) });
  });

  it('should search GIFs', () => {
    const query = 'cats';
    const offset = 0;
    service.searchGIFs(query, offset).subscribe((gifs) => {
      expect(gifs.length).toBe(25);
    });

    const req = httpTestingController.expectOne(
      `${API_ENDPOINT.SEARCH_GIFS}&offset=${offset}&q=${query}&offset=${offset}&limit=25`
    );
    expect(req.request.method).toEqual('GET');

    req.flush({ data: Array(25).fill({}) });
  });

  it('should upload GIF', () => {
    const file = new File([''], 'test.gif', { type: 'image/gif' });
    const expectedResponse = { id: 'abc123' } as any;
    service.uploadGIF(file).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(API_ENDPOINT.UPLOAD_GIF);
    expect(req.request.method).toEqual('POST');

    expect(req.request.headers.get('Content-Type')).toBeNull();

    expect(req.request.body instanceof FormData).toBeTruthy();
    expect((req.request.body as FormData).get('file')).toEqual(file);

    req.flush(expectedResponse);
  });

  it('should get GIF by ID', () => {
    const id = 'abc123';
    const expectedResponse = { id, title: 'Test GIF' } as any;
    service.getGIFbyId(id).subscribe((gif) => {
      expect(gif).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(
      `${BASE_URL}/${id}?api_key=${API_KEY}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush({ data: expectedResponse });
  });

  it('should toggle favorite', () => {
    const gif = { id: 'abc123', title: 'Test GIF' } as any;
    localStorage.setItem('favorites', JSON.stringify([gif]));
    service.toggleFavorite(gif);

    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as any[];
    expect(favorites).toEqual([]);
  });
});
