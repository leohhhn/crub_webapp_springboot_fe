import {Component} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-updateuserform',
	templateUrl: './updateuserform.component.html',
	styleUrls: ['./updateuserform.component.css']
})

export class UpdateuserformComponent {
	username: string = '';
	email: string = '';
	p_create: number = 0;
	p_update: number = 0;
	p_delete: number = 0;
	p_read: number = 0;

	constructor(private userService: UserService, private authService: AuthService, private router: Router) {
	}

	ngOnInit() {
		if (!this.authService.hasPermission('p_update')) {
			this.router.navigate(['userList']);
		}

		let u: User = this.userService.getUpdateUser();
		this.username = u.username;
		this.email = u.email;
		this.p_create = u.perm_create;
		this.p_update = u.perm_update;
		this.p_delete = u.perm_delete;
		this.p_read = u.perm_read;
	}

	// todo add mach permissions to form
	// todo let perm inputs be 1 or 0
	updateUser() {
		// todo reenable updating users
		// let t: User = new User(this.username, this.email, this.p_read, this.p_create, this.p_update, this.p_delete);
		// console.log("User sent to userService to update:\n" + t);
		// this.userService.updateUser(t);
	}


}
