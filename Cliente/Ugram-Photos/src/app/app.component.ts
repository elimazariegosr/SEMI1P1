import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ugram-Photos';
  constructor(private cookie:CookieService, private router:Router){
    
  }

  salir(){
    console.log("Saliendo")
    localStorage.removeItem("sesion")
    this.router.navigate(['/Users/Login'])

  }
  grabar_ls(){

  }
}
