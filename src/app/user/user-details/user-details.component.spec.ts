import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { NotifierService } from "angular-notifier";
import { UserService } from "../user.service";
import { Observable, of } from "rxjs";
import { IUser } from "../../interfaces";
import { ActivatedRoute } from "@angular/router";

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userServiceSpy: UserService;
  let notifierServiceSpy: NotifierService;
  const mockUser: IUser = {
    id: 1,
    name: 'Ant Ang',
    email: 'an@gmail.com',
    phone: "254792789093",
    username: "abc",
    website: 'abc.org'
  };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService',{
    fetchSingleUser: of(mockUser)});
    notifierServiceSpy = jasmine.createSpyObj<NotifierService>('NotifierService',{
      notify: undefined
    })
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {paramMap: of({get: () => '1'})}},
        {provide: UserService, useValue: userServiceSpy},
        {provide: NotifierService, useValue: notifierServiceSpy}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
