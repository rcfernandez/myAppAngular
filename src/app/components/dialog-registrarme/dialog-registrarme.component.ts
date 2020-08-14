import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader } from 'ng2-file-upload';
import { MatDialogRef } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';

const configSnack = environment.configSnackBar;

const pathFolder = './public/images/usuarios/'
const UrlUpload = `http://localhost:3000/upload?path=${pathFolder}`
const pathImage = "http://localhost:3000/images/usuarios/"

@Component({
   selector: 'app-dialog-registrarme',
   styles: [`

      mat-card {
         box-shadow: none !important;
         width: 400px;
      }

      mat-card-header {
         flex-direction: column;
      }

      td {
         padding-right: 8px;
      }

      .imageLogo {
         width: 100%;
         text-align: center;
         margin-bottom: 10px;
      }
      .imageLogo img {
         width: 150px;
      }

      .errorPass {
         font-size: 12px;
      }


   `],

   template: `

      <mat-card>

         <div class="imageLogo">
            <img [src]="imageLogo"/>
         </div>

         <mat-card-header align="center">
            <mat-card-title>Se miembro de nuestra web</mat-card-title>
            <mat-card-subtitle>Por favor rellena con tus datos</mat-card-subtitle>
         </mat-card-header>

         <form class="example-form" [formGroup]="myForm">

            <!-- usuario - oblig -->
            <mat-form-field class="example-full-width">
               <mat-icon matSuffix>account_circle</mat-icon>
               <mat-label>Usuario</mat-label>
               <input matInput autocomplete="off" formControlName="usuario">
               <mat-error>
                  <p *ngIf="isRequired('usuario')">El campo es <strong>Requerido</strong></p>
                  <p *ngIf="minCharacters('usuario')">El campo <strong>debe tener mas de 2 caracteres</strong></p>
                  <p *ngIf="maxCharacters('usuario')">El campo <strong>debe tener menos de 20 caracteres</strong></p>
               </mat-error>
            </mat-form-field>

            <table class="example-full-width" cellspacing="0">
               <tr>
                  <td>
                     <!-- password - oblig -->
                     <mat-form-field class="example-full-width">
                        <mat-label>Contraseña</mat-label>
                        <input type="password" matInput autocomplete="off" formControlName="password">
                        <mat-error *ngIf="isRequired('password')">El campo es <strong>Requerido</strong></mat-error>
                     </mat-form-field>
                  </td>
                  <td>
                     <!-- re-password - oblig -->
                     <mat-form-field class="example-full-width">
                        <mat-label>Confirmar contraseña</mat-label>
                        <input type="password" matInput autocomplete="off" formControlName="repassword">
                        <mat-error *ngIf="isRequired('repassword')">El campo es <strong>Requerido</strong></mat-error>
                     </mat-form-field>
                  </td>
               </tr>
               <tr>
                  <mat-error class="errorPass" *ngIf="passRepassSonIguales()">Las contraseñas <strong>No coinciden</strong></mat-error>
               </tr>
            </table>

            <table class="example-full-width" cellspacing="0">
               <tr>
                  <td>
                     <!-- nombre - oblig -->
                     <mat-form-field class="example-full-width">
                        <mat-label>Nombre</mat-label>
                        <input matInput autocomplete="off" formControlName="nombre">
                        <mat-error>
                           <p *ngIf="isRequired('nombre')">El campo es <strong>Requerido</strong></p>
                           <p *ngIf="minCharacters('nombre')">El campo <strong>debe tener mas de 2 caracteres</strong></p>
                           <p *ngIf="maxCharacters('nombre')">El campo <strong>debe tener menos de 20 caracteres</strong></p>
                        </mat-error>
                     </mat-form-field>
                  </td>
                  <td>
                     <!-- apellido -->
                     <mat-form-field class="example-full-width">
                        <mat-label>Apellido</mat-label>
                        <input matInput autocomplete="off" formControlName="apellido">
                        <mat-error>
                           <p *ngIf="isRequired('apellido')">El campo es <strong>Requerido</strong></p>
                           <p *ngIf="minCharacters('apellido')">El campo <strong>debe tener mas de 2 caracteres</strong></p>
                           <p *ngIf="maxCharacters('apellido')">El campo <strong>debe tener menos de 20 caracteres</strong></p>
                        </mat-error>
                     </mat-form-field>
                  </td>
               </tr>
            </table>

            <!-- email - oblig -->
            <mat-form-field class="example-full-width">
               <mat-icon matSuffix>alternate_email</mat-icon>
               <mat-label>Email</mat-label>
               <input type="email" matInput autocomplete="off" formControlName="email">
               <mat-error *ngIf="isRequired('email')">El campo es <strong>Requerido</strong></mat-error>
               <mat-error *ngIf="emailError()">El campo <strong>esta incompleto</strong></mat-error>
            </mat-form-field>

            <!-- imagen - upload -->
            <input type="file" id="photo" name="photo"  ng2FileSelect [uploader]="uploader" />

            <!-- acciones -->
            <mat-card-actions align="center">
               <button mat-raised-button color="primary" [disabled]="myForm.invalid" (click)="registrarme()">Registrarme</button>
            </mat-card-actions>

         </form>

      </mat-card>


   `,

})

export class DialogRegistrarmeComponent implements OnInit {

   myForm: FormGroup;
   imageLogo: string = `${environment.endpoint}/images/placeholders/logo_redondo.png `

   //Instanciar uploader
   public uploader: FileUploader = new FileUploader({ url: UrlUpload, itemAlias: "photo", additionalParameter: { data: "extra" } });
   pathImage = pathImage;
   imagenSeleccionada = "placeholder-image.png"
   changeImage: Boolean = false;

   constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private dialogRef: MatDialogRef<DialogRegistrarmeComponent>,
      private uiService : UiService

   ) {
      this.prepareForm();
      // this.checkUsername()
   }

   ngOnInit(): void {
   }

   prepareForm(){
      this.myForm = this.fb.group({
         nombre: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
         apellido: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
         usuario: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
         email: ['', [ Validators.required, Validators.email]],
         password: ['', [Validators.required, Validators.minLength(2)]],
         repassword: ['', [Validators.required, Validators.minLength(2)]],
         imagen: [''],
       }, { validators : this.validarContrasenasIguales });
   }

   // validar contraseñas
   validarContrasenasIguales(control: AbstractControl): ValidationErrors {
      return control.get('password').value === control.get('repassword').value ? null : { noSonIguales : true };
   }

   passRepassSonIguales(): boolean{
      return this.myForm.hasError('noSonIguales') && this.myForm.get('password').dirty && this.myForm.get('repassword').dirty;
   }

   // validacion es requerido
   isRequired(field: string): boolean{
      return this.myForm.get(field).hasError('required') && this.myForm.get(field).dirty;
   }

   minCharacters(field: string): boolean{
      return this.myForm.get(field).hasError('minlength') && this.myForm.get(field).dirty;
   }

   maxCharacters(field: string): boolean{
      return this.myForm.get(field).hasError('maxlength') && this.myForm.get(field).dirty;
   }

   emailError(): boolean{
      return this.myForm.get('email').hasError('email') && this.myForm.get('email').dirty;
   }

   registrarme(){
      if(this.uploader.queue.length > 0){
         this.uploader.uploadAll();
         this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any) => {
            let json = JSON.parse(response);
            this.myForm.get('imagen').setValue(json["data"]);
            this.guardar();
         };
      }  else{    // si no se cargo imagen
            this.guardar();
         };

   }

   guardar(){
      this.authService.registerUser(this.myForm.value).subscribe( res => {
         if(res['message']){
            if(res['status'] == 'success') {
               this.dialogRef.close();
               this.uiService.popup(res['message'], 'ok');
            }
            else this.uiService.popup(res['message'], 'error');
         }
      })
   }


   // openSnackBar(message: string) {
   //    this.snackBar.open( message, "", {
   //       horizontalPosition: configSnack.x,
   //       verticalPosition: configSnack.y,
   //       duration: 3000
   //    });
   // }


}
