import { Component, NgModule } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@NgModule({
  imports: [   ]
})

export class AppComponent {
  public title = 'GamerClub'
  public globalNotice = {
    text: 'GamerClub 后端服务正在更新，数据可能会中断',
    button: {
      enable: false,
      text: '',
      href: ''
    }
  }
}
