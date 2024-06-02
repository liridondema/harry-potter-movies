import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Movie } from '../core/models/movie';
import { RouterLink } from '@angular/router';
import { BudgetPipe } from '../shared/pipes/budget.pipe';
import { DurationPipe } from '../shared/pipes/duration.pipe';
import { MovieService } from '../services/movie.service';
import { Observable, combineLatest, map, startWith, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    RouterLink,
    BudgetPipe,
    DurationPipe,
    ReactiveFormsModule,
  ],
  providers: [MovieService],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  private _movieService = inject(MovieService);
  private _movies$: Observable<Movie[]> = this._movieService.getMovies();

  protected titleControl = new FormControl('', { nonNullable: true });
  protected releaseYearControl = new FormControl('', { nonNullable: true });

  private _titleFilter$: Observable<string> =
    this.titleControl.valueChanges.pipe(startWith(''));
  private _releaseYearFilter$: Observable<string> =
    this.releaseYearControl.valueChanges.pipe(startWith(''));

  protected filteredMovies$: Observable<Movie[]> = combineLatest([
    this._movies$,
    this._titleFilter$,
    this._releaseYearFilter$,
  ]).pipe(
    map(([movies, title, release_year]) =>
      movies.filter(
        (movie) =>
          movie.title.toLowerCase().indexOf(title.toLowerCase()) !== -1 &&
          movie.release_date
            .toString()
            .toLowerCase()
            .indexOf(release_year.toLowerCase()) !== -1
      )
    )
  );
}
