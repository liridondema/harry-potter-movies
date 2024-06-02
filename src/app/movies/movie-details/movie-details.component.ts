import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AsyncPipe } from '@angular/common';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { BudgetPipe } from '../../shared/pipes/budget.pipe';
import { Observable } from 'rxjs';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe, BudgetPipe, DurationPipe],
  providers: [MovieService],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  private _route = inject(ActivatedRoute);
  private _movieService = inject(MovieService);
  private _movieId: string | null = this._route.snapshot.paramMap.get('id');

  protected movie$: Observable<Movie> | null = this._movieService.getMovie(
    this._movieId
  );
}
