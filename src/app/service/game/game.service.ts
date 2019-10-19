import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { Observable, of, Subject, BehaviorSubject } from 'rxjs'
import { IGame } from 'src/app/model/igame'
import { IParameter } from 'src/app/model/iparameter'
import { IPagination } from 'src/app/model/ipagination'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({ providedIn: 'root' })
export class GameService {

  private readonly api = 'https://api.steamhub.cn/api/article/news?'
  // Observable string source
  private readonly parameterMissionAnnouncedSource = new Subject<IParameter>()
  private readonly pageAnnouncedSource = new Subject<IPagination>()

  // Observable string stream
  public missionAnnounced$ = this.parameterMissionAnnouncedSource.asObservable()
  public pageAnnounced$ = this.pageAnnouncedSource.asObservable()

  constructor(
    private readonly http: HttpClient) { }

  // Service message commands
  public parameterMission(mission: IParameter) {
    this.parameterMissionAnnouncedSource.next(mission)
  }

  public paginationMission(pagination: IPagination) {
    this.pageAnnouncedSource.next(pagination)
  }

  /** GET games from the server */
  public getGames<T>(parameter: IParameter): Observable<Array<IGame<T>>> {
    const text = parameter.text
    const orderDesc = parameter.orderDesc
    const body = new HttpParams({
      fromObject: {
        page: parameter.page.toString(),
        length: parameter.length.toString(),
        text: text ? text.toString() : '',
        orderDesc: orderDesc ? 'true' : 'false'
      }
    })
    return this.http.get<Array<IGame<T>>>(this.api + body)
  }
}
