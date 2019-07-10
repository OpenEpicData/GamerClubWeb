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
  public title = 'SteamHub'
  public globalNotice = {
    text: 'SteamHub 所有服务正在重构中，预计七月中旬完全可用',
    button: {
      enable: true,
      text: '查看我们的路线图',
      href: 'https://github.com/InGaming/SteamHub.Web#roadmap'
    }
  }
}
