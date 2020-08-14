import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';

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
      private fb: FormBuilder
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
         telefono: [this.usuario.telefono,Validators. required],
         email: [this.usuario.email, Validators.email],
         password: [this.usuario.password, [Validators.required, Validators.minLength(2)]],
         rol:[this.usuario.rol],
         imagen: [this.usuario.imagen]
      });

      this.imagenSeleccionada = this.usuario.imagen.filename;

   }

   onChange(event){
      if(event.type == 'change'){
        this.changeImage = true;
      }
    }




}

