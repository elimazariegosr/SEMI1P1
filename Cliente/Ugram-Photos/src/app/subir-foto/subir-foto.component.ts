import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['../styles_forms.css']
})
export class SubirFotoComponent implements OnInit {

  foto_cargada:any
  foto_b64:any
  constructor(private router: Router) {
    
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
    localStorage.setItem("ruta_anterior","/Users/Fotos/Subir");
    this.foto_b64 = localStorage.getItem("imgb64");

    this.foto_cargada = localStorage.getItem("encabezado")  +  this.foto_b64;
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");

  }


  ngOnInit(): void {
  }
  
  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
}
