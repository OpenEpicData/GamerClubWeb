import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of, Subject, BehaviorSubject } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { MessageService } from './message.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({ providedIn: 'root' })
export class GameService {

  private readonly api = 'https://api.steamhub.cn/api/game/details?'
  // Observable string source
  private readonly missionAnnouncedSource = new Subject<string>()
  private readonly pageAnnouncedSource = new Subject<boolean>()

  // Observable string stream
  missionAnnounced$ = this.missionAnnouncedSource.asObservable()
  pageAnnounced$ = this.pageAnnouncedSource.asObservable()

  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService) { }

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission)
  }

  pageMission(pagination: boolean) {
    this.pageAnnouncedSource.next(pagination)
  }

  /** GET games from the server */
  getGames<T>(parameter: string): Observable<Array<IGame<T>>> {
    return this.http.get<Array<IGame<T>>>(this.api + parameter)
      .pipe(
        tap(_ => this.log('fetched games')),
        catchError(this.handleError<Array<IGame<T>>>('getGames', []))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    // tslint:disable-next-line: no-any
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  /** Log a GameService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GameService: ${message}`)
  }
}
