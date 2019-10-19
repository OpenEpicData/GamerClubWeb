import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { IndexComponent } from './components/page/index/index.component'
import { LibraryComponent } from './components/page/library/library.component'
import { NewsComponent } from './components/page/news/news.component'

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'news', component: NewsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
