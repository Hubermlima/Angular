import { Component, OnInit } from '@angular/core';
import { UserSystemService } from 'src/app/service/user-system.service';
import { Observable } from 'rxjs';
import { UserSystem } from 'src/app/model/user-system';

@Component({
  selector: 'app-user-system',
  templateUrl: './user-system.component.html',
  styleUrls: ['./user-system.component.css']
})
export class UserSystemComponent implements OnInit {

  //userList: Observable<UserSystem[]>;
  userList: Array<UserSystem[]>;
  fragmentNameUser: String;
  config: any;

  
  constructor(private userService: UserSystemService) { 

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    };
  }

  ngOnInit() {

      this.listUserByFragmentOrEmptyName();
      
  }

  removeSelectedUser(id: Number, index) {

      if (confirm('Deseja remover?')) {

         this.userService.removeUserSystem(id).subscribe(data => {
                   alert('Retorno remove: ' + data);
                   this.userList.splice(index, 1);
         });
         
      }
  }

  listUserByFragmentOrEmptyName() {

    //if (!this.fragmentNameUser) {
      //this.fragmentNameUser = 'nomeVazio';
    //}
    
    this.userService.getUserListByFragmentOrEmptyName(this.fragmentNameUser, this.config.currentPage - 1).subscribe(data => {
      //this.userList = new Array<any>();
      this.userList = data.content;
      this.config.totalItems = data.totalElements;
    });
  }

  onPageChange(numPage) {
    this.config.currentPage = numPage;
    this.listUserByFragmentOrEmptyName();
  }
}
