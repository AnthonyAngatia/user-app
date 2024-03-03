import { Component, OnInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private userService: UserService,
              private notifierService: NotifierService) {


  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      website: ['', [Validators.required]],
      address: this.formBuilder.group({
        street: [''],
        suite: [''],
        city: ['']
      }),
      company: this.formBuilder.group({
        companyName: [''],
        catchPhrase: [''],
        bs: ['']
      })
    })

  }

  closeModal() {
    this.bsModalRef.hide();
  }

  submitForm(formValue: any) {
    // Transforming companyName to name
    formValue.company.name = formValue.company['companyName'];
    delete formValue.company['companyName'];

    this.userService.createUser(formValue).subscribe((value) => {
        this.notifierService.notify('success', 'User added successfully', 'add-user');
        this.closeModal()
      },
      error => {
        console.log(error);
        this.notifierService.notify('error', 'An Error Occurred');
      })

  }

}
