import { Component, OnInit } from '@angular/core'
import { NbSearchService } from '@nebular/theme'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
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
  }

  public searchValue: string

  constructor(
    private readonly searchService: NbSearchService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {

    this.searchService.onSearchSubmit()
      // tslint:disable-next-line: no-any
      .subscribe((data: any) => {
        this.searchValue = data.term
        this.router.navigate(['library'], { queryParams: { query: this.searchValue } })
      })
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        const query = params.query
        this.searchValue = query
      })
  }
}
