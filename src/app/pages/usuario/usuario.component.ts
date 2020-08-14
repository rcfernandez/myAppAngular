 import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dato } from 'src/app/models/dato.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader } from 'ng2-file-upload';

const pathFolder = './public/images/usuarios/'
const UrlUpload = `http://localhost:3000/upload?path=${pathFolder}`
const pathImage = "http://localhost:3000/images/usuarios/"

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
  configSnackBar = { duration: 2000, x: "right" as any, y: "top" as any };

  //Instanciar uploader
  public uploader: FileUploader = new FileUploader({ url: UrlUpload, itemAlias: "photo", additionalParameter: { data: "extra" } });
  pathImage = pathImage;
  imagenSeleccionada = "placeholder-image.png"
  changeImage: Boolean = false;

  //usuarios: Usuario[];
  
  constructor(
    public usuariosService: UsuariosService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
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

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje,"", {
      duration: this.configSnackBar.duration,
      horizontalPosition: this.configSnackBar.x,
      verticalPosition: this.configSnackBar.y
    });
  }

  traerUsuariosPaginado() {
    this.usuariosService.getUsuariosPaginado().subscribe( res => {
      this.dato = res['data'] as Dato;
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
        console.log(`ALTA: ${this.myForm.value}`);
        
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
      this.usuariosService.modificarUsuario(this.myForm.controls["_id"].value, this.myForm.value).subscribe( () => {
        this.resetForm();
        this.openSnackBar("Se ha modificado correctamente");
      });
    }
    // alta
    else{
      let data = this.usuariosService.altaUsuario(this.myForm.value).subscribe( () => {
        this.resetForm();
        this.openSnackBar("Se ha generado correctamente");
      });
    }
  }

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.usuariosService.borrarUsuario(id).subscribe(() => { 
        this.resetForm();
        this.openSnackBar("Se ha borrado correctamente");
       });
    }
  }

  // modificar(event) {
  //   if(event.type == 'click'){
  //     let usuario: Usuario = event.row;
  //     this.usuariosService.selectedUsuario = usuario;
  //     this.myForm = this.fb.group({
  //       _id: [usuario._id],
  //       usuario: [usuario.usuario,[Validators.required]],
  //       nombre: [usuario.nombre,[Validators.required]],
  //       apellido: [usuario.apellido,[Validators.required]],
  //       telefono: [usuario.telefono,[Validators.required]],
  //       email: [usuario.email, Validators.email],
  //       password: [usuario.password,[Validators.required]],
  //     });
  //   }
  // }

  // borrar(id) {
  //   if(confirm("Estas seguro de querer borrarlo?")){
  //     this.usuariosService.borrarUsuario(id).subscribe(() => {
  //       this.traerUsuariosPaginado();
  //       this.openSnackBar("Se ha borrado correctamente");
  //     });
  //   }
  // }

  // resetForm() {
  //   this.myForm.reset();
  //   this.prepareForm();
  //   this.traerUsuariosPaginado();
  // }

  // setPage(pageInfo){
  //   this.usuariosService.getUsuariosPaginado(pageInfo).subscribe( (data) =>{
      
  //     //Registros de productos (Informacion)
  //     this.dato = data as Dato;
  //     this.usuarios= this.dato.docs;

  //     //La pagina que estoy consultando
  //     this.dato.page = pageInfo["offset"];
  //   })
  // }

  // openSnackBar(mensaje:string) {
  //   this._snackBar.open(mensaje,"", {
  //     duration: 2000,
  //     horizontalPosition: "center",
  //     verticalPosition: "top"
  //   });
  // }

  
} /*clase Usuario*/
