import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapsComponent } from 'app/maps/maps.component';
import { ModalCreateProjectComponent } from 'app/modals/modal-create-project/modal-create-project.component';
import { ContractsService } from 'app/services/contract/contracts.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataContratc: any = '';
  dataUser;

  dataAdmin : boolean;
  dataUserInfo  : boolean = false;
  constructor(public dialog: MatDialog, private contract_service: ContractsService) { }
  
  ngOnInit() {
    this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
    console.log(this.dataUser[0].roles );
    
    if(this.dataUser[0].roles === "Super Admin"){
      this.Projects();
    }else{
      this.projectsFindId();
    }
  }

  Projects() {
    this.contract_service.getProjects().subscribe(data => {
      this.dataContratc = data;
      this.dataAdmin = true;
      console.log("ACA ADMIN", data);
    })
  }

  projectsFindId() {
    if(this.dataUser[0].proyectos !== ''){
      this.contract_service.getProjectsId(this.dataUser[0].proyectos).subscribe(data => {
          this.dataContratc = data;
          this.dataUserInfo = true;
          console.log("ACA ID", this.dataContratc);
        })
      }else{
      this.dataUserInfo = false;
      console.log('sin proyectos asignados');
    }
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalCreateProjectComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.Projects();
      }
    });
  }
}