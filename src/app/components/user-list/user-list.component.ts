import {Component,} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})

export class UserListComponent {
	users: User[] | undefined;

	constructor(private userSerivce: UserService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		if (!this.userSerivce.isLoggedIn()) {
			window.alert('Please log in first.');
			this.router.navigate(['login']);
		}
		if (this.userSerivce.isLoggedIn() && !this.authService.hasPermission('p_read')) {
			window.alert('no permission to READ!');
			this.router.navigate(['login']);
		}
		this.getAllUsers();
	}

	getAllUsers() {
		this.userSerivce.fetchAllUsers().subscribe(data => {
			this.users = data;
			this.userSerivce.users = data;
		});
	}

	userHasDeletePerm(): boolean {
		return this.authService.hasPermission('p_delete');
	}

	deleteUser(id: number | undefined) {
		this.userSerivce.deleteUser(id); // subscribe to observable here and call fetch again
		this.userSerivce.reloadUsers();
		this.reloadUserList();
		return;
	}

	reloadUserList() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = 'reload';
		this.router.navigate(['./'], {relativeTo: this.route})
	}

	userHasUpdatePerm() {
		return this.authService.hasPermission('p_update');
	}

	passUpdateId(userId: number | undefined) {
		this.userSerivce.setUpdateUser(userId);
	}
}


