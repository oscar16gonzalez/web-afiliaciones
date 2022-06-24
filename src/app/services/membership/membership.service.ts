import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) { }
  
  createMembership(membershipRegister: MembershipService) {
    return this.http.post('http://localhost:4000/afiliacion', membershipRegister);
  }

  getMembership() {
    return this.http.get('http://localhost:4000/afiliacion');
  }

  getUserFind(cedula: number) {
    return this.http.get('http://localhost:4000/afiliacion/'+ cedula);
  }

  putMemberShipState(id: string, data){
    console.log("cambiar");
    return this.http.put('http://localhost:4000/afiliacion/'+ id, data);
  }
}