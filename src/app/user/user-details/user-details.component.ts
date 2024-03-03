import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { UserService } from "../user.service";
import { NotifierService } from "angular-notifier";
import { IUser } from "../../interfaces";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId?: number;
  user?: IUser;
  pattern = new RegExp('a');

  constructor(private route: ActivatedRoute, private userService: UserService, private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.userId = Number(params.get('userId'));
        return this.userService.fetchSingleUser(this.userId);
      })
    ).subscribe({
      next: user => {
        this.user = user;
      },
      error: err => {
        console.log(err)
        this.notifierService.notify('error', err, 'single-user')
      }
    })
  }

}
