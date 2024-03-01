import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { catchError, EMPTY } from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users$ = this.userService.fetchUsers().pipe(
    catchError(err=>{
      console.error(err)
      return EMPTY;
    })
  )
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
