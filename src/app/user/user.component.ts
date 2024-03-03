import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { UserService } from "./user.service";
import { Subscription } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { UserFormComponent } from "./user-form/user-form.component";
import { NotifierService } from "angular-notifier";
import { IUser } from '../interfaces';
import { FormBuilder } from "@angular/forms";
import { toggle } from "../animations";
import { TABLE_PAGINATION_CONFIGS } from "../../environments/environment";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    toggle
  ]
})
export class UserComponent implements OnInit, OnDestroy {
  openModalRef?: BsModalRef;
  users: IUser[] = [];
  usersSub: Subscription | undefined;
  isLoading = false;
  tableError = false;
  filterForm = this.formBuilder.group({
    name: '',
    email: ''
  })
  showFilter = false;
  pattern = new RegExp('a');
  paginationConfig = {...TABLE_PAGINATION_CONFIGS};

  constructor(private userService: UserService, private modalService: BsModalService,
              private notifierService: NotifierService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  addUser() {
    this.openModalRef = this.modalService.show(UserFormComponent);
  }

  ngOnDestroy(): void {
    this.usersSub?.unsubscribe();
  }

  submitForm() {
    const name = this.filterForm.get('name')?.value;
    const email = this.filterForm.get('email')?.value;
    if (name) {
      const pattern = new RegExp(name.toLowerCase());
      const filteredUser = this.users.filter(user => pattern.test(user.name.toLowerCase()));
      if (filteredUser.length > 0) {
        this.users = filteredUser;
      } else {
        this.notifierService.notify('success', 'User Not Found', 'Not Found')
      }
    }
    if (email) {
      const pattern = new RegExp(email.toLowerCase());
      const filteredUser = this.users.filter(user => pattern.test(user.email.toLowerCase()));
      if (filteredUser.length > 0) {
        this.users = filteredUser;
      } else {
        this.notifierService.notify('success', 'User Not Found', 'Not Found')
      }
    }
  }

  clearFilter() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersSub = this.userService.fetchUsers().subscribe({
        next: results => {
          this.users = results;
        },
        error: error => {
          this.notifierService.notify('warning', error, 'uers-error')
        }
      }
    );
  }

  paginationChange(event: any) {
    const perPage = event.perPage;
    this.usersSub = this.userService.fetchUsers().subscribe({
        next: results => {
          this.users = results.slice(0, perPage);
          if (event.perPage > event.total) {
            event.perPage = event.total;
            event.lastRecord = event.total;
          }else{
          this.paginationConfig.lastRecord = perPage
          }
          this.paginationConfig = event;
        },
        error: error => {
          this.notifierService.notify('warning', error, 'uers-error')
        }
      }
    );
  }
}
