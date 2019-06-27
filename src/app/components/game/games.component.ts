import { Component, OnInit } from '@angular/core';

import { Game } from '../../service/game/game';
import { GameService } from '../../service/game/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent<T> implements OnInit {
  games: Game<T>[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames<T>()
    .subscribe(games => this.games = games);
  }
}
