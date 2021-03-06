import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['../styles_forms.css']
})
export class ModificarUsuarioComponent implements OnInit {

  sesion: any;
  foto_perfil:any
  foto_b64:any
  constructor(private router: Router) {
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
    this.sesion = JSON.parse(localStorage.getItem("sesion") +"")
    
    if(localStorage.getItem("encabezado") != null && localStorage.getItem("imgb64") != null){
      this.foto_b64 = localStorage.getItem("imgb64");
      this.foto_perfil = localStorage.getItem("encabezado")  +  this.foto_b64;
    }else{
      this.foto_perfil = this.sesion.fotoPerfil.S;
    } 
    localStorage.setItem("ruta_anterior","/Users/Edit");
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");
  }

  ngOnInit(): void {
  }

  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
}
