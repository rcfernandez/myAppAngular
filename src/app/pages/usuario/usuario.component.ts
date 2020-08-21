 import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dato } from 'src/app/models/dato.model';
import { FileUploader } from 'ng2-file-upload';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

const pathFolder = './public/images/usuarios/'
const UrlUpload = `${environment.endpoint}/upload?path=${pathFolder}`;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {

  titulo = "Usuarios"
  subtitulo = "Aca puede realizar cambios sobre los Usuarios"
  myForm: FormGroup;
  dato: Dato;
  columns=[];

  //Instanciar uploader
  public uploader: FileUploader = new FileUploader({ url: UrlUpload, itemAlias: "photo", additionalParameter: { data: "extra" } });
  pathImage = environment.endpoint + '/images/usuarios/';
  imagenSeleccionada = "placeholder-image.png"
  changeImage: Boolean = false;

  //usuarios: Usuario[];

  constructor(
    public usuariosService: UsuariosService,
    private fb: FormBuilder,
    private uiService: UiService
    ) {
      this.prepareColumns();
      this.prepareForm();
    }

  ngOnInit(): void {
    this.traerUsuariosPaginado();
    this.setPage({ offset: 0 });
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      usuario: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido: [''],
      telefono: [''],
      email: ['', Validators.required],
      password: ['',Validators.required],
      imagen:[''],
      rol: [''],
    });
  }

  prepareColumns(){
    this.columns=[
      { name:'Usuario',prop:'usuario' },
      { name:'Nombre',prop:'nombre' },
      { name:'Apellido',prop:'apellido' },
      { name:'Telefono',prop:'telefono' },
      { name:'Email',prop:'email' },
      { name:'Password',prop:'password' },
      { name:'Rol',prop:'rol' }
    ]
  }

  onChange(event){
    if(event.type == 'change'){
      this.changeImage = true;
    }
  }

  onActivate(event) {
    if(event.type == 'click') {
      this.cargarForm(event.row);
      this.changeImage = false;
    }
  }

  cargarForm(usuario: Usuario) {
    this.myForm = this.fb.group({
      _id: [usuario._id],
      usuario: [usuario.usuario, Validators.required],
      nombre: [usuario.nombre, Validators.required],
      apellido: [usuario.apellido],
      telefono: [usuario.telefono],
      email: [usuario.email, Validators.required],
      password: [usuario.password, Validators.required],
      imagen: [usuario.imagen],
      rol: [usuario.rol],
    });
    this.imagenSeleccionada = usuario.imagen.filename;
  }

  resetForm() {
    this.myForm.reset();
    this.imagenSeleccionada = 'placeholder-image.png';
    this.changeImage = false;
    this.traerUsuariosPaginado();
  }

  setPage(pageInfo){
    this.usuariosService.getUsuariosPaginado(pageInfo).subscribe( res =>{
      this.dato = res["data"] as Dato;
      this.dato.page = pageInfo["offset"];
    })
  }

   traerUsuariosPaginado() {
      this.usuariosService.getUsuariosPaginado().subscribe( res => {
         if(res['status'] == 'success'){
            this.dato = res['data'] as Dato;
         } else {
            this.uiService.popup(res['message'], 'error');
         }
      });
   }

  alta() {
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
      console.log(`paso sin guardar imagen`);
    }
  }

  guardar(){
   if(this.myForm.controls["_id"].value){
      // modificacion
      this.usuariosService.modificarUsuario(this.myForm.controls["_id"].value, this.myForm.value).subscribe( res => {
         if(res['status'] == 'success') {
            this.resetForm();
            this.uiService.popup(res['message'], 'ok');
         }
         this.uiService.popup(res['message'], 'error');
      });
    }
    // alta
    else{
      let data = this.usuariosService.altaUsuario(this.myForm.value).subscribe( res => {
         if(res['status'] == 'success') {
            this.resetForm();
            this.uiService.popup(res['message'], 'ok');
         }
         this.uiService.popup(res['message'], 'error');
      });
    }
  }

   borrar(id) {
      if(confirm("Estas seguro de querer borrarlo?")){
         this.usuariosService.borrarUsuario(id).subscribe(res => {
            if(res['status'] == 'success') {
               this.resetForm();
               this.uiService.popup(res['message'], 'ok');
            }
            this.uiService.popup(res['message'], 'error');
         });
      }
   }


} /*clase Usuario*/
