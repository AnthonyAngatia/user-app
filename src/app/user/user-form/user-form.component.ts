import { Component, OnInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder) {
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
      })
    })

  }

  closeModal(){
    this.bsModalRef.hide();
  }

  submitForm(){
    console.log(this.userForm.value);
  }

}
