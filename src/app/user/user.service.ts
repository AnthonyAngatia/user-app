import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { IUser } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private httpClient: HttpClient) {
  }

  createUser(user: IUser) {
    return this.httpClient.post<IUser>(`${this.baseUrl}/users`, user).pipe(
      map(response => {
        if (response.id) {
          return response;
        } else if (!response) {
          throw new HttpErrorResponse({
            status: 500,
            statusText: "An error occurred",
            url: `${this.baseUrl}/uses`
          });
        }
        throw new HttpErrorResponse({
          status: 500,
          statusText: "An error occured",
          url: `${this.baseUrl}/uses`
        });
      }),
      catchError(this.handleError)
    )

  }

  fetchUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.baseUrl}/users`).pipe(
      map(response => {
        if (response === null) {
          throw new HttpErrorResponse({
            status: 500,
            statusText: "No response was returned",
            url: `${this.baseUrl}/uses`
          });
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
    } else if (error.status === 404) {
      return throwError(() => new Error('Resource not Found'));
    } else if (error.status === 500) {
      return throwError(() => new Error('Server Error'));
    }
    return throwError(() => new Error('An error occured. Try again later'));
  }
}
