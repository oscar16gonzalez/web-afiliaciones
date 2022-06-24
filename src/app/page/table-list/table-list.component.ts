import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoMembershipComponent } from 'app/modals/modal-info-membership/modal-info-membership.component';
import { MembershipService } from 'app/services/membership/membership.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  dataUserMembership;

  constructor(private membershipService: MembershipService, public dialog: MatDialog,) { }

  ngOnInit() {
    this.getMembership();
  }

  getMembership() {
    this.membershipService.getMembership().subscribe(
      (data) => {
        this.dataUserMembership = data
      })
  }

  openDialog(cedula) {

    const dialogRef = this.dialog.open(ModalInfoMembershipComponent, {
      width: '1200px',
      data: { cedula }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result----: ${result}`);
      if (result) {
        this.getMembership();
      }
    });
  }

}
