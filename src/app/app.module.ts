import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {NewuserformComponent} from './components/newuserform/newuserform.component';
import {UpdateuserformComponent} from './components/updateuserform/updateuserform.component';

@NgModule({
	declarations: [
		AppComponent,
		UserListComponent,
		NavbarComponent,
		LoginComponent,
		UpdateuserformComponent,
		NewuserformComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
