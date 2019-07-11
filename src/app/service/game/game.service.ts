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

  private readonly api = 'https://api.steamhub.cn/api/game/details?'
  // Observable string source
  private readonly missionAnnouncedSource = new Subject<IParameter>()
  private readonly pageAnnouncedSource = new Subject<IPagination>()

  // Observable string stream
  public missionAnnounced$ = this.missionAnnouncedSource.asObservable()
  public pageAnnounced$ = this.pageAnnouncedSource.asObservable()

  constructor(
    private readonly http: HttpClient) { }

  // Service message commands
  public parameterMission(mission: IParameter) {
    this.missionAnnouncedSource.next(mission)
  }

  public paginationMission(pagination: IPagination) {
    this.pageAnnouncedSource.next(pagination)
  }

  /** GET games from the server */
  public getGames<T>(parameter: IParameter): Observable<Array<IGame<T>>> {
    const body = new HttpParams({
      fromObject: {
        page: parameter.page.toString(),
        length: parameter.length.toString()
      }
    })
    return this.http.get<Array<IGame<T>>>(this.api + body)
  }
}
