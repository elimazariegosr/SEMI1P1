import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['../styles_forms.css']
})
export class SubirFotoComponent implements OnInit {

  constructor(private router: Router, private cookie: CookieService) {
    
    if(cookie.get("session") == ""){
      this.router.navigate(['/Users/Login'])
    }

  }


  ngOnInit(): void {
  }

}
