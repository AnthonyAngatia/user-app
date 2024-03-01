import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from "./user.service";
import { catchError, EMPTY } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  openModalRef?: BsModalRef;
  users$ = this.userService.fetchUsers().pipe(
    catchError(err=>{
      console.error(err);
      return EMPTY;
    })
  )
  constructor(private userService: UserService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  addUser() {
    this.openModalRef = this.modalService.show(UserFormComponent);
  }
}
