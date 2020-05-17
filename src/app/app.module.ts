import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component' ; // Requisicoes ajax
import {RouterModule, Routes} from '@angular/router'
import { LoginServiceService } from './service/login-service.service';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component'
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UserSystemComponent } from './componente/userSystem/user-system/user-system.component';
import { UsersystemAddComponent } from './componente/userSystem/usersystem-add/usersystem-add.component';
import { GuardianGuard } from './service/guardian.guard';
import { NgxPaginationModule } from 'ngx-pagination';

export const appRouters: Routes = [
   {path : 'home', component: HomeComponent, canActivate: [GuardianGuard]},
   {path: 'login', component: LoginComponent},
   {path: '', component: LoginComponent},
   {path: 'userList', component: UserSystemComponent, canActivate: [GuardianGuard]},
   {path: 'userSystemAdd', component: UsersystemAddComponent, canActivate: [GuardianGuard]},
   {path: 'userSystemAdd/:id', component: UsersystemAddComponent, canActivate: [GuardianGuard]}

];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserSystemComponent,
    UsersystemAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
