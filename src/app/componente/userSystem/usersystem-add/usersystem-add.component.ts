import { Telefone } from './../../../model/telefone';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserSystemService } from 'src/app/service/user-system.service';
import { UserSystem } from 'src/app/model/user-system';

@Component({
  selector: 'app-root',
  templateUrl: './usersystem-add.component.html',
  styleUrls: ['./usersystem-add.component.css']
})
export class UsersystemAddComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, 
              private userService: UserSystemService) { }

  
  userSystem = new UserSystem();
  telephone = new Telefone();

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) { // Edit
      this.userService.getUserById(id).subscribe(data => {
        this.userSystem = data;
      }); 
    } 

  }

  persistUserSystem() {
  
     if (this.userSystem.id != null && this.userSystem.id.toString().trim() != null) {
       // Updating...
       this.userService.updateUserSystem(this.userSystem).subscribe(data => {
       }); 
     } else {
       // New
       this.userService.saveUserSystem(this.userSystem).subscribe(data => {
       });

     }
     // Limpar a tela depois de incluir/atualizar
     this.newUser();
  }

  newUser() {
    this.userSystem = new UserSystem();
  }

  addTelephoneUser() {
      this.userSystem.telephones.push(this.telephone);        
      this.telephone = new Telefone();

  }
  removeSelectedTelephone(id, i) {

    if (confirm("Deseja realmente excluir telefone?")) {
      this.userSystem.telephones.splice(i, 1);  // Remove o telefone da lista na tela
      if (id != null) {   // Se estiver em banco de dados - remove!
               this.userService.deleteUserTelephone(id).subscribe(data => { 
                    console.info("Telephone removed successfully: " + data) 
               });
      }         
 }



  }
}
