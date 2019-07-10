import { Component, OnInit } from '@angular/core'
import { GameService } from '../../../service/game/game.service'
import { ActivatedRoute } from '@angular/router'
import { IParameter } from 'src/app/model/iparameter'
import { IPagination } from 'src/app/model/ipagination'
import { HttpParams } from '@angular/common/http'
import { query } from '@angular/animations'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  providers: [GameService]
})

export class LibraryComponent implements OnInit {
  private readonly pagination: IPagination = {
    display: true
  }
  public parameter: IParameter = {
    page: 1,
    length: 24
  }
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly gameService: GameService) {
  }

  ngOnInit(): void {
    this.pagination.display = true
    this.announce()
    this.activatedRoute.queryParams.subscribe(
      params => console.log('queryParams', params.query))
  }

  announce(): void {
    this.gameService.announceMission(this.parameter)
    this.gameService.pageMission(this.pagination)
  }

  search(value: string): void {
    console.log(this.parameter)
    this.gameService.announceMission(this.parameter)
  }
}
