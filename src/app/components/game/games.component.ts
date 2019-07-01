import { Component, OnInit, Input } from '@angular/core';

import { Game } from '../../service/game/game';
import { GameService } from '../../service/game/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent<T> implements OnInit {
  games: Game<T>;
  missionSubscription: Subscription;
  paginationSubscription: Subscription;
  page = 1;
  parameter = 'page=1&length=6&orderDesc=true';
  pagination: boolean;

  constructor(private gameService: GameService) {
    this.missionSubscription = gameService.missionAnnounced$.subscribe(
      mission => {
        this.parameter = mission;
      }
    );
    this.paginationSubscription = gameService.pageAnnounced$.subscribe(
      pagination => {
        this.pagination = pagination;
      }
    );
  }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames<T>(this.parameter)
      .subscribe(games => this.games = games[0]);
  }

  gamesPageChange(page: number, parameter: string): void {
    this.gameService.getGames<T>(`${parameter}&page=${page}`)
      .subscribe(games => this.games = games[0]);
  }

  scrollTop(): void {
    window.scroll(0, 0);
  }
}
