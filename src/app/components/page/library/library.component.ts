import { Component, OnInit } from '@angular/core'
import { GameService } from '../../../service/game/game.service'
import { ActivatedRoute, Router } from '@angular/router'
import { IParameter } from 'src/app/model/iparameter'
import { IPagination } from 'src/app/model/ipagination'

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
    length: 24,
    orderDesc: true
  }
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly gameService: GameService) {
  }

  public ngOnInit(): void {
    this.pagination.display = true
    this.announce()
    this.activatedRoute.queryParams.subscribe(
      params => {
        const query = params.query
        this.parameter.text = query ? query : ''
        this.gameService.parameterMission(this.parameter)
      })
  }

  public announce(): void {
    this.gameService.paginationMission(this.pagination)
  }

  public search(value: string): void {
    this.router.navigate(['library'], { queryParams: { query: value } })
    this.parameter.text = value
  }

  public clearInput(): void {
    this.parameter.text = ''
    this.router.navigate(['library'], { queryParams: { query: this.parameter.text } })
  }
}
