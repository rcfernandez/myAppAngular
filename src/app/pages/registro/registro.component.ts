import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  public myForm;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      nombre: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      apellido: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      telefono: ['',Validators. required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  registro() {
    console.log(this.myForm.value);
  }

  ngOnInit(): void {}
}
