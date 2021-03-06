import { Component, OnInit, Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['../styles_forms.css']
})
export class RegistrarComponent implements OnInit {

  foto_perfil = ""
  foto_b64 :any
  constructor(private router: Router) {
    if(localStorage.getItem("sesion") != null){
      this.router.navigate(['/Users'])
    }
    localStorage.setItem("ruta_anterior","/Users/Registrar");
    this.foto_b64 = localStorage.getItem("imgb64");

    this.foto_perfil = localStorage.getItem("encabezado")  +  this.foto_b64;
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");

   }

  ngOnInit(): void {
  }

  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
  
}
