import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost/test_possible/web/books";
  private REST_API_SERVER_SEARCH = "http://localhost/test_possible/web/books/search";
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown error!';
    if(error.error instanceof ErrorEvent){
      //Client-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } else if (error.status == 404) {
      errorMessage = 'Not found';
    }
    return throwError(errorMessage);
  }

  public sendGetRequest(){
    // Add safe, URL encoded _page and _limit parameters 
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }

  public sendGetRequestSearch(title: string, author: string){
    // Add safe, URL encoded _page and _limit parameters 

    const options = { params: new HttpParams().set('title', title).set('author', author) };
    return this.httpClient.get(this.REST_API_SERVER_SEARCH, options).pipe(retry(3), catchError(this.handleError));
  }

}
