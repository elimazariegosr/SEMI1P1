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
  constructor(private router: Router) {
    if(localStorage.getItem("sesion") == ""){
      this.router.navigate(['/Users/Login'])
    }
    
    this.sesion = JSON.parse(localStorage.getItem("sesion") +"")

  }

  ngOnInit(): void {
  }

}
