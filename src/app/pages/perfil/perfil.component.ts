import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { UiService } from 'src/app/services/ui.service';

const pathFolder = './public/images/usuarios/'
const UrlUpload = `${environment.endpoint}/upload?path=${pathFolder}`
const pathImage = `${environment.endpoint}/images/usuarios/`

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

   titulo = "Mis Datos"
   subtitulo = "Aqui se muestran sus datos"
   myForm: FormGroup;
   usuario: Usuario = new Usuario();

   public uploader: FileUploader = new FileUploader({ url: UrlUpload, itemAlias: "photo" });
   pathImage = pathImage;
   imagenSeleccionada = "placeholder-image.png"
   changeImage: Boolean = false;

   constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private uiService: UiService
   ) {
   }

   ngOnInit(): void {
      let decode = jwt_decode(localStorage.getItem("token"));
      this.usuario = decode.usuario;
      this.prepareForm();
   }

   prepareForm(){
      this.myForm = this.fb.group({
         _id: [this.usuario._id],
         usuario: [this.usuario.usuario],
         nombre: [this.usuario.nombre,[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
         apellido: [this.usuario.apellido,[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
         telefono: [this.usuario.telefono],
         email: [this.usuario.email, Validators.email],
         password: ['', [Validators.minLength(2)]],
         imagen: [this.usuario.imagen]
         // rol:[this.usuario.rol],
      });

      this.imagenSeleccionada = this.usuario.imagen.filename;

   }

   onChange(event){
      if(event.type == 'change'){
        this.changeImage = true;
      }
   }

   actualizarUsuario() {
      // agrega imagen
      if(this.changeImage){

        this.uploader.uploadAll();
        this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any) => {
          let json = JSON.parse(response);
          this.myForm.get('imagen').setValue(json["data"]);
          this.guardar();
        };
      }
      // no agrega imagen
      else {
        this.guardar();
      }
    }

    // modificacion
   guardar(){
      this.authService.updateUser(this.myForm.value).subscribe( res => {
         if(res['status'] == 'success') {
            this.uiService.popup(res['message'], 'ok');
         } else {
            this.uiService.popup(res['message'], 'error');
         }
      });
   }




}

