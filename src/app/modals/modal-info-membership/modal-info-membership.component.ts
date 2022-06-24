import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembershipService } from 'app/services/membership/membership.service';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-modal-info-membership',
  templateUrl: './modal-info-membership.component.html',
  styleUrls: ['./modal-info-membership.component.css']
})
export class ModalInfoMembershipComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  nameUser: any;
  responseDataUserInfo: any = '';
  imageData;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private membershipService: MembershipService) { }

  ngOnInit(): void {
    console.log(this.data);

    this.membershipService.getUserFind(this.data.cedula).subscribe(response => {
      console.log('INFO USER ', response);
      this.nameUser = response[0].nombre
      this.responseDataUserInfo = response[0];

      console.log(this.responseDataUserInfo);

    })

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

  changeState() {
    const data = {
      estado: 'Afiliado'
    }
    this.membershipService.putMemberShipState(this.responseDataUserInfo._id, data).subscribe(data => {
      console.log("data-----", data);

    })
  }
}
