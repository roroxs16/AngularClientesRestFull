import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../clients/client';
import { ClientService } from '../../services/client.service';

import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import {ModalService} from '../../services/modal.service';
@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  title: string = "Detalle Cliente";
  @Input() client: Client;
  progreso: number = 0;
  selectedFile: File;
  modal: ModalService;
  constructor(private clientService: ClientService,
    public modalService: ModalService) { }

  ngOnInit(): void {  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    this.progreso = 0;
    //console.log(this.selectedFile);
    if (this.selectedFile.type.indexOf('image') < 0) {
      swal.fire('Error al seleccionar la imagen: ', 'El archivo debe ser una foto.', 'error');
      this.selectedFile = null;
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      swal.fire('Error Upload: ', 'Debe seleccionar un archivo.', 'error');
    } else {
      this.clientService.uploadPhoto(this.selectedFile, this.client.id)
        .subscribe(event => {
          if(event.type===HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
          } else if(event.type === HttpEventType.Response){
            let response:any = event.body;
            this.client = response.cliente as Client;

            this.modalService.notificarUpload.emit(this.client);




            swal.fire("La foto se ha subido completamente!", response.mensaje, 'success');
          }
          //this.client = client;

        });
    }
  }

  closeModal(){
    this.modalService.closeModal();
    this.selectFile = null;
    this.progreso = 0;
  }
}
