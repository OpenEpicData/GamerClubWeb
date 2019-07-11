import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

import { GameService } from '../../service/game/game.service'
import { Subscription } from 'rxjs'
import { IGame } from 'src/app/model/igame'
import { IParameter } from 'src/app/model/iparameter'
import { IPagination } from 'src/app/model/ipagination'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent<T> {
  @Input() skeleton: boolean

  public games: IGame<T>
  public missionSubscription: Subscription
  public paginationSubscription: Subscription
  public pagination: IPagination = {
    display: false
  }
  public parameter: IParameter

  constructor(private readonly gameService: GameService) {
    this.missionSubscription = gameService.missionAnnounced$.subscribe(
      mission => {
        this.parameter = {
          page: mission.page,
          length: mission.length,
          text: mission.text,
          orderDesc: mission.orderDesc
        }
        this.getGames()
      }
    )
    this.paginationSubscription = gameService.pageAnnounced$.subscribe(
      pagination => {
        this.pagination.display = pagination.display
      }
    )
  }

  public getGames(): void {
    this.skeleton = true
    this.gameService.getGames<T>(this.parameter)
      .subscribe(
        games => {
          this.games = games[0]
          this.skeleton = false
        },
      )
  }

  public gamesPageChange(page: number): void {
    this.parameter.page = page
    this.getGames()
  }

  public scrollTop(): void {
    this.skeleton = true
    window.scroll(0, 0)
  }
}
