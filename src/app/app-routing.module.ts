import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {UserListComponent} from './components/user-list/user-list.component'
import {UpdateuserformComponent} from './components/updateuserform/updateuserform.component';
import {NewuserformComponent} from './components/newuserform/newuserform.component';

const routes: Routes = [
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'userList', component: UserListComponent},
	{path: 'newUser', component: NewuserformComponent},
	{path: 'updateUser', component: UpdateuserformComponent},
	{path: '**', component: LoginComponent} // todo change to 404 not found component
];

//  todo? intercepter on httpclient on any error to redirect to login
@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		HttpClientModule
	],
	exports: [RouterModule]
})

export class AppRoutingModule {
}
