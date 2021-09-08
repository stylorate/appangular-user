import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { RespService } from './../resp-service';
// import swal from 'sweetalert2';
import swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  response: RespService;
  usuarios: Usuario[];

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.service.getUsuarios().subscribe(
      resp => {
        // console.log("response: " + JSON.stringify(resp)),
        this.response = resp as RespService,
          this.usuarios = resp.list as Usuario[]
      },
      err => console.log('Error: ', err)
    );
  }

  deleteUser(user: Usuario): void {
    swal({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar el usuario ${user.name} ${user.lastName}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar lo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.service.deleteUser(user.idCard).subscribe(
          resp => {
            if (resp.message === "OK") {
              this.usuarios = this.usuarios.filter(filter => filter !== user);
              swal(
                'Eliminado!',
                `El usuario ${user.name} ${user.lastName} ha sido eliminado`,
                'success'
              );
            }
          },
          err => console.log('Error: ', err)
        );
      }
    });
  }
}
