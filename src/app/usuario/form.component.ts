import { Usuario } from './usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
// import { RespService } from './../resp-service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  usuario: Usuario = new Usuario();
  titulo: string = 'Crear usuario';
  tituloUpdate: string = 'Editar usuario';
  // response: RespService;

  constructor(private service: UsuarioService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

  public create(): void {
    this.service.createOrUpdate(this.usuario).subscribe(
      resp => {
        // this.response = resp as RespService,
        this.usuario = resp.body as Usuario,
          this.router.navigate(['/usuarios']),
          swal('Usuario guardado',
            `Usuario ${this.usuario.name} creado con exito`,
            'success')
      },
      err => {
        console.log("Error: " + JSON.stringify(err)),
          swal(`Error ${err.error.message}`,
            `${err.error.fieldErrors[0].field} ${err.error.fieldErrors[0].message}`,
            'error')
      }
    );
  }

  public getUser(): void {
    this.activatedRoute.params.subscribe(
      resp => {
        let id = resp['idCard'];
        if (id) {
          this.service.getUser(id).subscribe(
            resp => {
              this.usuario = resp.body as Usuario;
            },
            err => {
              swal(`Error ${err.error.message}`,
                `${err.error.fieldErrors[0].field} ${err.error.fieldErrors[0].message}`,
                'error')
            }
          );
        }
      },
      err => {
        console.log("Error: " + JSON.stringify(err)),
          swal(`Error ${err.error.message}`,
            `${err.error.fieldErrors[0].field} ${err.error.fieldErrors[0].message}`,
            'error')
      }
    )
  }

  public update(): void {
    this.service.createOrUpdate(this.usuario).subscribe(
      resp => {
        this.usuario = resp.body as Usuario;
        console.log("resp: " + JSON.stringify(resp));
        this.router.navigate(['/usuarios']);
        swal('Usuario actualizado',
          `Usuario ${this.usuario.name} actualizado con exito! `,
          'success')
      },
      err => {
        console.log("Error: " + JSON.stringify(err)),
          swal(`Error ${err.error.message}`,
            `${err.error.fieldErrors[0].field} ${err.error.fieldErrors[0].message}`,
            'error')
      }
    );
  }
}
