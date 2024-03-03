import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from "./user.service";
import { NotifierService } from "angular-notifier";
import { of } from "rxjs";
import { IUser } from "../interfaces";
import { BsModalService } from "ngx-bootstrap/modal";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceSpy: UserService;
  let notifierServiceSpy: NotifierService;
  let fakeModalService: BsModalService;
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

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', {
      fetchUsers: of(mockUsers)
    });
    notifierServiceSpy = jasmine.createSpyObj<NotifierService>('NotifierService', {
      notify: undefined
    })
    fakeModalService = jasmine.createSpyObj<BsModalService>('BsModalService', {
      hide: undefined
    });
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgxPaginationModule],
      declarations: [UserComponent],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: NotifierService, useValue: notifierServiceSpy},
        {provide: BsModalService, useValue: fakeModalService},

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
