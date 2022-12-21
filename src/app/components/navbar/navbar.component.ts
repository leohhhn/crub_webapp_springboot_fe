import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	username: string | null = '';

	constructor(private userService: UserService, private authService: AuthService, private router: Router) {
	}

	logout() {
		this.username = '';
		this.userService.logout();
	}

	isLoggedIn(): boolean {
		if (this.userService.isLoggedIn()) {
			this.username = 'Hello, '.concat(<string>localStorage.getItem('loggedInUsername'));
			return true;
		}
		return false;
	}

	userHasUpdatePerm(): boolean {
		return this.authService.hasPermission('p_update');
	}

	userHasCreatePerm(): boolean {
		return this.authService.hasPermission('p_create');
	}

	getCurrentPath(): string {
		return this.router.url;
	}
}
