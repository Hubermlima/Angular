import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UserSystemService {

  constructor(private http: HttpClient) { }

  getUserList(): any {
    return this.http.get<any>(AppConstants.baseUserController + 'listUsers');
  }

  getUserListbyPage(page): any {
    return this.http.get<any>(AppConstants.baseUserController + 'listUsers/' + 'page/' + page);
  }

  getUserById(id: String): Observable<any> {
    return this.http.get<any>(AppConstants.baseUserController + 'returnUserById/' + id);
  }

  removeUserSystem(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUserController + id, {responseType : 'text'});
  }

  getUserListByFragmentOrEmptyName(fragmentName: String, page): Observable<any> {
   
    return this.http.get(AppConstants.baseUserController + 'returnUserFilter?' + 
                                                           'fragmentName=' + fragmentName + '&' + 
                                                           'page=' + page);
  }

  saveUserSystem(userSystem): Observable<any> {
    return this.http.post<any>(AppConstants.baseUserController, userSystem);
  }

  updateUserSystem(userSystem): Observable<any> {
    return this.http.put<any>(AppConstants.baseUserController, userSystem);
  }

  deleteUserTelephone(id): Observable<any> {
    return this.http.delete(AppConstants.baseUserController + "removerTelephone/" + id, {responseType: 'text'});
  }

  public athenticateUserSystem() {
    if (localStorage.getItem('token') != null && 
        localStorage.getItem('token').toString().trim() != null) { 
      return true;
    }
    return false;
  }

}
