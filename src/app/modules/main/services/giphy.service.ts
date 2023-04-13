import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_ENDPOINT, BASE_URL, API_KEY } from 'src/app/core/base-url/APIs';
import {
  GIFDetailsResponse,
  GIFsResponse,
  GiphyData,
  UploadGIFResponse,
} from '../models/GIFs.model';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(private httpClient: HttpClient) {}

  getTrendingGIFs(offset: number = 0): Observable<GiphyData[]> {
    return this.httpClient
      .get<GIFsResponse>(
        `${API_ENDPOINT.TRENDING_GIFS}&offset=${offset}&limit=25`
      )
      .pipe(map((response: GIFsResponse) => response.data));
  }

  searchGIFs(query: string, offset: number = 0): Observable<GiphyData[]> {
    return this.httpClient
      .get<GIFsResponse>(
        `${API_ENDPOINT.SEARCH_GIFS}&offset=${offset}&q=${query}&offset=${offset}&limit=25`
      )
      .pipe(map((response: GIFsResponse) => response.data));
  }

  uploadGIF(file: File): Observable<UploadGIFResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<UploadGIFResponse>(
      API_ENDPOINT.UPLOAD_GIF,
      formData
    );
  }

  getGIFbyId(id: string): Observable<GiphyData> {
    return this.httpClient
      .get<GIFDetailsResponse>(`${BASE_URL}/${id}?api_key=${API_KEY}`)
      .pipe(map((response: GIFDetailsResponse) => response.data));
  }

  toggleFavorite(gif: GiphyData): void {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as GiphyData[];
    const gifIndex = favorites.findIndex((favorite) => favorite.id === gif.id);

    if (gifIndex !== -1) {
      // The GIF is already in the favorites
      favorites.splice(gifIndex, 1);
    } else {
      // The GIF is not in the favorites
      favorites.push(gif);
    }
    // Update the local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
