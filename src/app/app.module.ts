import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbTabsetModule,
  NbAlertModule,
  NbCardModule,
  NbActionsModule,
  NbSearchModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NzCarouselModule,
  NZ_I18N,
  zh_CN,
  NzGridModule
} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { HeaderComponent } from './components/layouts/header/header.component';
import { GamesComponent } from './components/game/games.component';
import { IndexComponent } from './components/page/index/index.component';
import { LibraryComponent } from './components/page/library/library.component';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    HeaderComponent,
    IndexComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbAlertModule,
    NbTabsetModule,
    NbCardModule,
    NzCarouselModule,
    FormsModule,
    HttpClientModule,
    NbActionsModule,
    NbSearchModule,
    NzGridModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }