import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, EMPTY, map, Observable, throwError } from "rxjs";
import { IUser } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private httpClient: HttpClient) { }

  fetchUsers(): Observable<IUser[]>{
    return this.httpClient.get<IUser[]>(`${this.baseUrl}/users`).pipe(
      map(response =>{
        if(response === null){
          throw new HttpErrorResponse({status: 500, statusText: "No response was returned", url: `${this.baseUrl}/uses`});
        }
        return response;
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(() => new Error('Network Error. Could not connect to the Server'));
    }
    return throwError(() => new Error('An error occured. Try again later'));
  }
}
