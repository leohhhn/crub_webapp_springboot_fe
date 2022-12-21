import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	username: string = '';
	password: string = '';

	constructor(private userService: UserService) {
	}

	login(username: string, password: string) {
		this.userService.login(username, password);
	}
}
