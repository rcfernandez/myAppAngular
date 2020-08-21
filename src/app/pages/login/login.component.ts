import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

import { MatDialog } from '@angular/material/dialog';
import { DialogRegistrarmeComponent } from 'src/app/components/dialog-registrarme/dialog-registrarme.component';
import { UiService } from 'src/app/services/ui.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

   hide = true;
   myForm: FormGroup;
   columns = [];


   constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
      public dialog: MatDialog,
      private uiService: UiService
   ) {
      this.prepareForm();
   }

   ngOnInit(): void {

   }

   prepareForm() {
      this.myForm = this.fb.group({
         usuario: [''],
         password: [''],
      });
   }

   resetForm() {
      this.myForm.reset();
   }

   login() {
      this.authService.login(this.myForm.value).subscribe(res => {
         if (res["message"]) {
            // res['status'] === 201 ? this.uiService.popup('Bienvenido', 'ok') : this.uiService.popup(res['message'], 'error')
            res['status'] != 201 ? this.uiService.popup(res['message'], 'error') : '';
         }

         if (res["status"] === 201) {
            localStorage.setItem("token", res["token"]);
            this.authService.authenticationState.next(true);
            this.router.navigate(['/']);
         }

      });
   }

   openDialogRegister() {
      const dialogRef = this.dialog.open(DialogRegistrarmeComponent);
      dialogRef.afterClosed().subscribe();
   }


} // end class
