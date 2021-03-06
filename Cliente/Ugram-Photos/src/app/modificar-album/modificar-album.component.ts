import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-modificar-album',
  templateUrl: './modificar-album.component.html',
  styleUrls: ['../styles_forms.css']
})
export class ModificarAlbumComponent implements OnInit {
  constructor(private router: Router) {
    
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
  }


  ngOnInit(): void {
  }

}
