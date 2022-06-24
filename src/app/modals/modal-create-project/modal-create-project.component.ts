import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractsService } from 'app/services/contract/contracts.service';
import { UserService } from '../../services/user/users.service';

@Component({
  selector: 'app-modal-create-project',
  templateUrl: './modal-create-project.component.html',
  styleUrls: ['./modal-create-project.component.css']
})
export class ModalCreateProjectComponent implements OnInit {

  formCreateContract: FormGroup;
  responseData;

  constructor(private fb: FormBuilder, private contract_service: ContractsService, private user_service: UserService) { }

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.formCreateContract = this.fb.group({
      contrato: [''],
      objeto_contrato: [''],
      contratista: [''],
      nit: [''],
      nombre_rep_legal: [''],
      cedula_rep_legal: [''],
      // integrantes: this.fb.group({
      //   nombre: [''],
      //   numero_documento: [''],
      //   porcentaje: [''],
      // }),
      // anticipo: [''],
      // interventoria: this.fb.group({
      //   nombre: [''],
      //   nit: [''],
      //   representante_legal: [''],
      //   cedula_representante_legal: [''],
      // }),
      valor_contrato: [''],
      departamento: [''],
      municipio: [''],
      usuarios: [''],

    });
  }


  createProject() {
    const idUser = JSON.parse(localStorage.getItem('infoUser'));
    this.contract_service.postProjects(this.formCreateContract.value).subscribe(data => {
      this.responseData = data;
      const dataContract = {
        proyectos: this.responseData._id
      }
      this.user_service.putProjectUser(idUser[0]._id, dataContract).subscribe(data => {
      })
    })
  }

}
