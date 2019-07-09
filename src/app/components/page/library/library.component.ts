import { Component, OnInit } from '@angular/core'
import { GameService } from '../../../service/game/game.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  providers: [GameService]
})

export class LibraryComponent implements OnInit {
  query: string
  page = 1
  length = 24
  pagination = true
  text = ''
  parameter = `&page=${this.page}&length=${this.length}&text=${this.text}&orderDesc=true`
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly gameService: GameService) { }

  ngOnInit(): void {
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
    this.text = value
    this.gameService.announceMission(this.parameter)
  }
}
