import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../core/models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _http = inject(HttpClient);
  private _api = 'http://localhost:4200/movies/';

  private _movies$: Observable<Movie[]> = this._http.get<Movie[]>(this._api);

  getMovies(): Observable<Movie[]> {
    return this._movies$;
  }

  getMovie(movieId: string | null): Observable<Movie> | null {
    if (movieId === null) return null;
    return this._http.get<Movie>(this._api + movieId);
  }
}
