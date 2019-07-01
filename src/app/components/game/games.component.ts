import { Component, OnInit } from '@angular/core';

import { Game } from '../../service/game/game';
import { GameService } from '../../service/game/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent<T> implements OnInit {
  games: Game<T>[];
  subscription: Subscription;
  url = 'https://api.steamhub.cn/api/game/details?page=1&length=6&orderDesc=true';

  constructor(private gameService: GameService) {
    this.subscription = gameService.missionAnnounced$.subscribe(
      mission => {
        this.url = mission;
      }
    );
  }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames<T>(this.url)
      .subscribe(games => this.games = games);
  }
}
