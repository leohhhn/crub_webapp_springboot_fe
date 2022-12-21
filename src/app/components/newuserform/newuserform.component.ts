import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-newuserform',
	templateUrl: './newuserform.component.html',
	styleUrls: ['./newuserform.component.css']
})
export class NewuserformComponent {
	username: string = '';
	email: string = '';
	p_create: number = 0;
	p_update: number = 0;
	p_delete: number = 0;
	p_read: number = 0;
	password: string = '';

	constructor(private userService: UserService, private authService: AuthService, private router: Router) {
		if (!this.authService.hasPermission('p_create')) {
			this.router.navigate(['userList']);
		}
	}

	ngOnInit() {
	}

	createUser() {
		let newUser = new User(this.username, this.email, this.p_read, this.p_create, this.p_update, this.p_delete, this.password);
		this.userService.createUser(newUser);
		this.router.navigate(['userList']);

	}

}
