import { Component, OnInit } from '@angular/core';

import { Client} from './client';

import {ClientService} from '../../services/client.service';

import  Swal  from 'sweetalert2'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clientes: Client[];
  constructor(private clienteService: ClientService) { }

  ngOnInit(): void {
    this.clienteService.getClients().subscribe(
      clientes => this.clientes = clientes
    );
  }

  deleteClient(client: Client): void{

      const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro que desea eliminar?',
      text: `¿Está seguro que desea eliminar a ${client.name} ${client.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimnar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.deleteClient(client.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== client );
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${client.name} ${client.lastName} eliminado con exito.`,
              'success'
            )
          }
        )

      }
    })
      }

}
