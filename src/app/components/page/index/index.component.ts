import { Component } from '@angular/core'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {
  carouselItems = [
    {
      image: 'https://s2.ax1x.com/2019/06/27/ZnSXKf.jpg',
      title: '巫师 3：狂猎',
      description: '随着北方领域战乱四起，您接下了此生最为重大的一笔委托：找到预言之子，一件足以改变世界面貌的活生生的武器。'
    },
    {
      image: 'https://s2.ax1x.com/2019/06/27/Zn9Gpn.jpg',
      title: '神界：原罪 2',
      description: '召集你的团队，探讨战术，左右战局。你最多可以和其他三名玩家合作——但是，最终只有其中一人有机会成为神'
    }
  ]
}
