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
// todo remove delete button for currently logged in user

export class UserListComponent {
	users: User[] | undefined;

	constructor(private userService: UserService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		if (!this.userService.isLoggedIn()) {
			window.alert('Please log in first.');
			this.router.navigate(['login']);
		}
		if (this.userService.isLoggedIn() && !this.authService.hasPermission('p_read')) {
			window.alert('no permission to READ!');
			this.router.navigate(['login']);
		}
		this.getAllUsers(); // todo change arch to have userService distribute user list to components
	}

	getAllUsers() {
		this.userService.fetchAllUsers().subscribe(data => {
			this.users = data;
			console.log(this.users)
			this.userService.users = data;
		});
	}

	userHasUpdatePerm() {
		return this.authService.hasPermission('p_update');
	}

	passUpdateId(userId: number | undefined) {
		this.userService.setUpdateUser(userId); // used to pass id from list to update form
	}

	// currentUser():string {
	// 	return <string>this.userService.currentUser?.username;
	// }

	userHasDeletePerm(): boolean {
		return this.authService.hasPermission('p_delete');
	}

	deleteUser(id: number | undefined) {
		// @ts-ignore
		this.userService.deleteUser(id).subscribe((res) => {
				this.reloadUserList();
			},
			res => {
				console.log("DELETE call in error", res);
			});
	}

	reloadUserList() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = 'reload';
		this.router.navigate(['./'], {relativeTo: this.route})
	}
}


