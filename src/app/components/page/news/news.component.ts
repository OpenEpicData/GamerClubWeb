import { Component, OnInit } from '@angular/core'
import { GameService } from '../../../service/game/game.service'
import { ActivatedRoute, Router } from '@angular/router'
import { IParameter } from 'src/app/model/iparameter'
import { IPagination } from 'src/app/model/ipagination'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  private readonly pagination: IPagination = {
    display: false
  }
  public parameter: IParameter = {
    page: 1,
    length: 24,
    orderDesc: true
  }
  constructor(
    private readonly gameService: GameService) {
  }

  public ngOnInit(): void {
    this.announce()
  }

  public announce(): void {
    this.gameService.parameterMission(this.parameter)
    this.gameService.paginationMission(this.pagination)
  }
}
