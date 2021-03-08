import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../styles_forms.css']
})
export class HomeComponent implements OnInit {

  sesion:any;
  constructor(private router: Router) {
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
   }

   obtener(){
   
   }
  
  ngOnInit(): void {
  }
  ver_fotos(){
    this.router.navigate(['/Users/Fotos'])
  }
  subir_foto(){
    this.router.navigate(['/Users/Fotos/Subir'])
  }
  editar_album(){
    this.router.navigate(['/Users/Fotos/Modifcar'])
  }
  editar_perfil(){
    this.router.navigate(['/Users/Edit'])
  }
}
