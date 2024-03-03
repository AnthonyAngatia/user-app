import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { IUser } from "../interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const mockUser: IUser = {
    id: 1,
    name: 'Ant Ang',
    email: 'an@gmail.com',
    phone: "254792789093",
    username: "abc",
    website: 'abc.org'
  };
  const mockUsers: IUser[] = [{
    id: 1,
    name: 'John Doe',
    email: 'an@gmail.com',
    phone: "254792789093",
    username: "abc",
    website: 'abc.org'
  }, {
    id: 2,
    name: 'An Ang',
    email: 'an@gmail.com',
    phone: "254792789093",
    username: "abc",
    website: 'abc.org'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', () => {
    service.createUser(mockUser).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const request = httpMock.expectOne(`${environment.baseUrl}/users`);
    expect(request.request.method).toBe('POST');
    request.flush(mockUser);
  });

  it('should fetch users', () => {
    let actualResults: IUser[] | undefined;
    service.fetchUsers().subscribe(users => {
      actualResults = users;
    });

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(request.request.method).toBe('GET');
    request.flush(mockUsers);
    expect(actualResults).toEqual(mockUsers);

  });

  it('should fetch a single user', () => {
    service.fetchSingleUser(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/1');
    expect(request.request.method).toBe('GET');
    request.flush(mockUser);
  });

  it('should handle HTTP errors', () => {

    service.fetchUsers().subscribe(
      () => {
        fail(new HttpErrorResponse({
          status: 500,
          statusText: "No response was returned",
          url: `${environment.baseUrl}/uses`
        }))
        fail('No response was returned')
      },
      (error: HttpErrorResponse) => {
        // expect(error.statusText).toBe('No response was returned');
      }
    );

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(request.request.method).toBe('GET');
    request.error(new ErrorEvent('error'), { status: 500, statusText: 'Internal Server Error' });
  });
});
