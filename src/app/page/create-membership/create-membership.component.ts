import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembershipModel } from 'app/models/membership.model';
import { MembershipService } from 'app/services/membership/membership.service';


import pdfMake from 'pdfmake/build/pdfMake';
// import pdfFonts from 'pdfmake/build/vfs fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vsf;

import * as alertify from 'alertify.js';


@Component({
  selector: 'app-create-membership',
  templateUrl: './create-membership.component.html',
  styleUrls: ['./create-membership.component.css']
})
export class CreateMembershipComponent implements OnInit {

  formMembership: FormGroup;
  membership = new MembershipModel;
  imageData;

  imageSrc = './assets/img/faces/user.png'

  selectedGender = [
    { id: 1, name: 'Masculino' },
    { id: 2, name: 'Femenino' },
  ]

  selectCargo = [
    { id: 1, name: 'Ayudante' },
    { id: 2, name: 'Ayudante Practico' },
    { id: 3, name: 'Oficial' },
    { id: 4, name: 'Masestro' },
    { id: 5, name: 'Soldador' },
  ]

  constructor(private formBuilder: FormBuilder, private membership_service: MembershipService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formMembership = this.formBuilder.group({
      //DATOS BASICOS
      cedula: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      //DATOS DE NOTIFICACION
      direccion: ['', Validators.required],
      telefono: [''],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      celular: ['', Validators.required],
      nombre_emergencia: ['', Validators.required],
      celular_emergencia: ['', Validators.required],
      //DATOS DE TRABAJADOR
      fecha_ingreso: ['', Validators.required],
      rut: ['', Validators.required],
      curso_alturas: ['', Validators.required],
      examen_ingreso: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: ['', Validators.required],
      //DATOS BANCARIOS
      entidad_bancaria: [''],
      numero_cuenta: [''],
      //DATOS AFILIACION
      eps: [''],
      arl: [''],
      fondo_pensiones: [''],
      caja_compensacion: [''],

      estado: ['pendiente_examen_medico'],
      foto: ['', Validators.required],

      // contratista: ['', Validators.required],
      // contrato: ['', Validators.required],
      // departamento: ['', Validators.required],
      // municipio: ['', Validators.required],

    });
  }


  findByCedula() {
    this.membership_service.getUserFind(this.membership.cedula).subscribe(
      (data: any) => {
        console.log(data);
        this.membership.apellido = data[0].apellido
        this.membership.nombre = data[0].nombre
        this.membership.celular = data[0].celular
        // this.membership.genero = data[0].genero
        // this.membership.fecha_ingreso = data[0].fecha_ingreso
      }
    )
  }

  createMembership() {
    if (this.membership.fondo_pensiones === undefined || this.membership.arl === undefined || this.membership.eps === undefined || this.membership.caja_compensacion === undefined || this.membership.entidad_bancaria === undefined || this.membership.numero_cuenta === undefined) {
      this.membership.fondo_pensiones = 'Por definir ';
      this.membership.arl = 'Por definir ';
      this.membership.eps = 'Por definir ';
      this.membership.caja_compensacion = 'Por definir ';
      this.membership.entidad_bancaria = 'Por definir ';
      this.membership.numero_cuenta = 'Por definir ';
    }

    if (this.formMembership.invalid) {
      Object.values(this.formMembership.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.membership_service.createMembership(this.formMembership.value).subscribe(
        (data) => {
          alertify.success('Aspirante creado con exito.');
          this.createPfd();
        }
      );
    }
  }

  fileSelected(event: Event) {
    console.log(event);

    const file = (event.target as HTMLInputElement).files[0];
    const fileTypes = ["image/png", "image/jpeg", "image/jpg"]
    console.log("file", file);
    console.log('fileType', fileTypes);
    if (file && fileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {

        this.imageData = reader.result as string;
        console.log(this.imageData);

      }
      reader.readAsDataURL(file);
    }


  }




  createPfd() {
    console.log(this.imageData);




    const pdfDefinition: any = {
      content: [
        {
          text: 'HOJA DE VIDA RAPIDA',
          style: 'header'
        },

        {
          image: this.imageData === undefined ? this.imageSrc : this.imageData,
          width: 70,
          height: 100,
          alignment: 'center',
        },

        {
          text: 'DATOS BASICOS',
          style: 'header2'
        },


        {
          alignment: 'justify',
          style: 'subheader',
          columns: [
            {

              text: [
                'NOMBRE: ',
                { text: `${this.membership.nombre} ${this.membership.apellido}`, style: 'data' },
              ],
            },

            {

              text: [
                'CEDULA: ',
                { text: `${this.membership.cedula}`, style: 'data' },
              ],
            },

          ],

        },
        {
          alignment: 'justify',
          style: 'subheader',
          columns: [
            {

              text: [
                'FECHA NACIMIENTO: ',
                { text: `${this.membership.fecha_ingreso}`, style: 'data' },
              ],
            },

            {

              text: [
                'GENERO: ',
                { text: `${this.membership.genero}`, style: 'data' },
              ],
            },

          ],
        },

        {
          text: 'DATOS NOTIFICACION',
          style: 'header2'
        },

        {
          alignment: 'justify',
          style: 'subheader',
          columns: [
            {

              text: [
                'DIRECCION: ',
                { text: `${this.membership.direccion}`, style: 'data' },
              ],
            },

            {

              text: [
                'CELULAR: ',
                { text: `${this.membership.celular}`, style: 'data' },
              ],
            },

          ],
        },


        {
          alignment: 'justify',
          style: 'subheader',
          columns: [
            {

              text: [
                'CORREO: ',
                { text: `${this.membership.correo}`, style: 'data' },
              ],
            },

            // {

            //   text: [
            //     'WHP/TELEGRAM: ',
            //     { text: `${this.membership.arl}`, style:'data'  },
            //   ],
            // },

          ],
        },

        {
          text: 'INFORMACION LABORAL',
          style: 'header2'
        },

        {
          alignment: 'justify',
          style: 'subheader',
          columns: [
            {

              text: [
                'EPS: ',
                { text: `${this.membership.eps}`, style: 'data' },
              ],
            },

            {

              text: [
                'ARL: ',
                { text: `${this.membership.arl}`, style: 'data' },
              ],
            },

            {

              text: [
                'FONDO PENSIONES: ',
                { text: `${this.membership.fondo_pensiones}`, style: 'data' },
              ],
            },

          ],
        },

        {
          text: 'CONTACTO DE EMERGENCIA',
          style: 'header2'
        },

        {
          text: `NOMBRE CONTACTO : ${this.membership.nombre_emergencia}`,
          style: 'subheader'
        },

        {
          // text: `CELULAR CONTACTO : ${this.membership.celular_emergencia}`,
          text: [
            'CELULAR CONTACTO : ',
            { text: `${this.membership.celular_emergencia}` },
          ],
          style: 'subheader'
        },

        {

          alignment: 'justify',
          style: 'subheader',
          columns: [
            {
              width: '70%',
              style: 'firma',
              type: 'none',
              ul: [
                '_______________________________',
                'FIRMA TRABAJADOR ',
                `NOMBRE:  ${this.membership.nombre} ${this.membership.apellido}`,
                `CEDULA:  ${this.membership.cedula}`,
              ]
            },

            {
              style: 'tableExample',
              table: {
                heights: [90],
                widths: [70],
                body: [
                  [''],

                ]
              }
            },
          ],
        },


        {
          style: 'info',
          ul: [
            'Declaro que toda la informacion descrita en el formulario de inscripcion y en los soportes de mi hoja de vida son veraces',
            'Autorizo al contratista para que la informacion suministrada sea verificada.',
          ]
        },
      ],

      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          decorationStyle: 'solid',
          decorationColor: 'black',
          margin: [10, 5, 10, 10]
        },
        header2: {
          // alignment: 'center',
          fontSize: 15,
          bold: true,
          decoration: 'underline',
          decorationStyle: 'solid',
          decorationColor: 'gray',
          margin: [10, 20, 10, 10]
        },
        subheader: {
          fontSize: 12,
          padding: 2,
          bold: true,
          margin: [2, 10, 2, 10]
        },
        info: {
          fontSize: 10,
          margin: [10, 20, 10, 0]
        },
        firma: {
          fontSize: 12,
          margin: [10, 50, 10, 0],

        },
        data: {
          fontSize: 11,
          bold: false,
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
      }
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    this.formMembership.reset();
  }


}
