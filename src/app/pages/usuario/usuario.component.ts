import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dato } from 'src/app/models/dato.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  myForm: FormGroup;

  dato: Dato;
  columns=[];
  
  constructor(
    public usuariosService: UsuariosService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
      this.prepareForm();
      this.prepareColumns();
    }

  ngOnInit(): void {
    this.traerUsuarios();
    this.setPage({ offset: 0 });
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      usuario: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  prepareColumns(){
    this.columns=[
      { name:'Usuario',prop:'usuario' },
      { name:'Nombre',prop:'nombre' },
      { name:'Apellido',prop:'apellido' },
      { name:'Telefono',prop:'telefono' },
      { name:'Email',prop:'email' },
      { name:'Password',prop:'password' }
    ]
  }

  traerUsuarios() {
    this.usuariosService.getUsuariosPaginado().subscribe((data) => {
      this.dato = data as Dato;
      this.usuarios = this.dato.docs;
    });
  }

  alta() {
    if(this.myForm.controls["_id"].value){
      // se modifica
      this.usuariosService.modificarUsuario(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha modificado correctamente");
      });
    }
    // sino agrega uno nuevo
    else{
      this.usuariosService.altaUsuario(this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha modificado correctamente");
      });
      
    }
  }

  modificar(event) {
    if(event.type == 'click'){
      let usuario: Usuario = event.row;
      this.usuariosService.selectedUsuario = usuario;
      this.myForm = this.fb.group({
        _id: [usuario._id],
        usuario: [usuario.usuario,[Validators.required]],
        nombre: [usuario.nombre,[Validators.required]],
        apellido: [usuario.apellido,[Validators.required]],
        telefono: [usuario.telefono,[Validators.required]],
        email: [usuario.email, Validators.email],
        password: [usuario.password,[Validators.required]],
      });
    }

  }

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.usuariosService.borrarUsuario(id).subscribe(() => {
        this.traerUsuarios();
        this.openSnackBar("Se ha borrado correctamente");
      });
    }
  }

  resetForm() {
    this.myForm.reset();
    this.prepareForm();
    this.traerUsuarios();
  }

  setPage(pageInfo){
    this.usuariosService.getUsuariosPaginado(pageInfo).subscribe( (data) =>{
      
      //Registros de productos (Informacion)
      this.dato = data as Dato;
      this.usuarios= this.dato.docs;

      //La pagina que estoy consultando
      this.dato.page = pageInfo["offset"];
    })
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje,"", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  
} /*clase Usuario*/
