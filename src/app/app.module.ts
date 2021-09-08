import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { UsuarioService } from './usuario/usuario.service';
import { FormComponent } from './usuario/form.component';
import { FormsModule } from '@angular/forms'

const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'usuario/form', component: FormComponent },
  { path: 'usuario/form/:id/:idCard', component: FormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    UsuarioComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
