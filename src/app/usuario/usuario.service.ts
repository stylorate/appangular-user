import { Injectable } from '@angular/core';
// import { USUARIOS } from './usuario.json';
import { Usuario } from './usuario';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespService } from './../resp-service';
import swal from 'sweetalert2';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'http://localhost:8088/api-users/v1/user';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient, private router : Router) { }

  getUsuarios(): Observable<RespService> {
    // return of(USUARIOS);
    return this.http.get<RespService>(this.url);
  }

  createOrUpdate(user: Usuario): Observable<RespService> {
    return this.http.post<RespService>(this.url, user, { headers: this.httpHeaders });
  }

  getUser(id: string): Observable<RespService> {
    return this.http.get<RespService>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/usuarios']);
        console.error(e.error.message);
        swal('Error al editar ' , e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  deleteUser(id: string): Observable<RespService> {
    return this.http.delete<RespService>(`${this.url}/${id}`, { headers: this.httpHeaders });
  }

}
