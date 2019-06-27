import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@NgModule({
  imports: [   ]
})

export class AppComponent {
  title = 'SteamHub';
  globalNotice = 'SteamHub 所有服务正在重构中，预计七月中旬完全可用';
}
