import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotosComponent } from './fotos/fotos.component';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModificarAlbumComponent } from './modificar-album/modificar-album.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { SeleccionarFotoComponent } from './seleccionar-foto/seleccionar-foto.component';
import { SubirFotoComponent } from './subir-foto/subir-foto.component';

const routes: Routes = [
  //{path:'**', pathMatch:'full', redirectTo:'Users/Login'},
  {path: 'Users/Login', component: LoginComponent},
  {path: 'Users/Registrar', component: RegistrarComponent},
  {path: 'Users/Fotos', component: FotosComponent},
  {path: 'Users/Edit', component: ModificarUsuarioComponent},
  {path: 'Users/Fotos/Subir', component: SubirFotoComponent},
  {path: 'Users/Fotos/Seleccionar', component: SeleccionarFotoComponent},
  {path: 'Users/Fotos/Modifcar', component:ModificarAlbumComponent},
  {path: 'Users', component: HomeComponent},
  {path: '', component: HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
