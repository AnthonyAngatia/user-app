import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NotifierService } from "angular-notifier";
import { UserService } from "../user.service";
import { of } from "rxjs";
import { IUser } from "../../interfaces";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let notifierServiceSpy: NotifierService;
  let userServiceSpy: UserService;
  let fakeModalService: BsModalRef;
  const mockUser: IUser = {
    id: 1,
    name: 'Ant Ang',
    email: 'an@gmail.com',
    phone: "254792789093",
    username: "abc",
    website: 'abc.org'
  };

  beforeEach(async () => {
    notifierServiceSpy = jasmine.createSpyObj<NotifierService>('NotifierService',{
      notify: undefined
    });
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService',{
      createUser: of(mockUser)});
    fakeModalService = jasmine.createSpyObj<BsModalRef>('BsModalService', {
      hide: undefined
    });
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ UserFormComponent ],
      providers:[
        {provide: NotifierService, useValue: notifierServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
        {provide: BsModalRef, useValue: fakeModalService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModel-it should be called', () => {
    component.closeModal();
    expect(fakeModalService.hide).toHaveBeenCalled();
  })
});
