import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Game } from '../../service/game/game';
import { GameService } from '../../service/game/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent<T> implements OnInit {
  @Input() skeleton: boolean;
  @Output() spinningChange = new EventEmitter<boolean>();

  games: Game<T>;
  missionSubscription: Subscription;
  paginationSubscription: Subscription;
  page: number;
  parameter: string;
  pagination: boolean;

  constructor(private gameService: GameService) {
    this.parameter = 'page=1&length=6&orderDesc=true';
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
    this.skeleton = true;
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames<T>(this.parameter)
      .subscribe(
        games => {
          this.games = games[0];
          this.skeleton = false;
        },
      );
  }

  gamesPageChange(page: number, parameter: string): void {
    this.gameService.getGames<T>(`${parameter}&page=${page}`)
      .subscribe(
        games => {
          this.games = games[0];
          this.skeleton = false;
        },
      );
  }

  scrollTop(): void {
    this.skeleton = true;
    window.scroll(0, 0);
  }
}
