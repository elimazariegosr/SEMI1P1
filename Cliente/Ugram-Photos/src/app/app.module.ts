import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { FotosComponent } from './fotos/fotos.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { SubirFotoComponent } from './subir-foto/subir-foto.component';
import { ModificarAlbumComponent } from './modificar-album/modificar-album.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SeleccionarFotoComponent } from './seleccionar-foto/seleccionar-foto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrarComponent,
    FotosComponent,
    ModificarUsuarioComponent,
    SubirFotoComponent,
    ModificarAlbumComponent,
    SeleccionarFotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
