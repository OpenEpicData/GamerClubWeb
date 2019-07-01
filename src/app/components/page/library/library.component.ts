import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../service/game/game.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  providers: [GameService]
})

export class LibraryComponent implements OnInit {
  page = 1;
  length = 24;
  pagination = true;
  parameter = `&page=${this.page}&length=${this.length}&orderDesc=true`;
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.announce();
  }

  announce() {
    this.gameService.announceMission(this.parameter);
    this.gameService.pageMission(this.pagination);
  }
}
