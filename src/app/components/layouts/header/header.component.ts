import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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
}
