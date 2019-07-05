import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  header = {
    leftItems: [
      {
        title: 'SteamHub',
        href: '/'
      },
      {
        title: '游戏库',
        href: '/library'
      },
      {
        title: '趋势',
        href: '/leaderboard'
      },
      {
        title: '新闻',
        href: '/news'
      },
    ],
    rightItems: [
      'bell-outline',
      'person-add-outline'
    ]
  };

  searchValue: string;

  constructor(private searchService: NbSearchService, private router: Router) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchValue = data.term;
        this.router.navigate(['library'], { queryParams: {query: this.searchValue} });
      });
  }
}
