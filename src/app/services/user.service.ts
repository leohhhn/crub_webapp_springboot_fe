import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	// todo could be a pitfall; this list should be read-only!!!
	// todo update after create/update/delete!!!!
	users: User[] = [];

	userToUpdate: User | undefined;

	private baseURL = 'http://localhost:8090';

	constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
	}

	fetchAllUsers(): Observable<User[]> {
		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}
		const requestOptions = {
			headers: new HttpHeaders(headerDict),
		};

		return this.httpClient.get<User[]>(`${this.baseURL}/users/all`, requestOptions);
	}

	reloadUsers() {
		this.fetchAllUsers().subscribe(res => {
			this.users = res;
		});
	}

	login(username: string, password: string) {
		this.httpClient.post(`${this.baseURL}/auth/login`, {
			username: username,
			password: password
		}).subscribe((res) => {
				localStorage.setItem('jwt', Object.values(res)[0]);
				localStorage.setItem('loggedInUsername', username);
				this.router.navigate(['userList']);
			}, (error) => {
				window.alert('Bad credentials; try again.');
			}
		);
	}

	logout() {
		this.authService.removeJWT();
		this.router.navigate(['login']);
	}

	isLoggedIn(): boolean {
		return localStorage.getItem('jwt') !== null;
	}

	deleteUser(id: number | undefined) {
		if (!this.authService.hasPermission('p_delete')) return;

		let userToDelete: User;

		this.users?.forEach((u) => {
			if (u.userId == id) {
				userToDelete = u;
			}
		});

		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}
		const requestOptions = {
			headers: new HttpHeaders(headerDict),
			body: {
				'userId': id,
				'username': '',
				'email': '',
				'perm_update': '',
				'perm_read': '',
				'perm_create': '',
				'perm_delete': ''
			}
		};

		// todo fix not showing updated table immediately
		// todo fix problem when deleting yourself- jwtFilter snaps in spring & lets you delete yourself

		try { // todo return observable and in component re
			this.httpClient.delete(`${this.baseURL}/users/delete`, requestOptions).subscribe((res) => {
					console.log("DELETE call successful value returned in body",
						res);
				},
				res => {
					console.log("DELETE call in error", res);
				});
		} catch {
		}
	}

	setUpdateUser(id: number | undefined) {
		this.users?.forEach((u) => {
			if (u.userId == id) {
				this.userToUpdate = u;
			}
		});
	}

	getUpdateUser(): User {
		return <User>this.userToUpdate;
	}

	updateUser(u: User) {
		if (!this.authService.hasPermission('p_update')) return;
		u.userId = this.userToUpdate?.userId;


		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`
		});

		const requestOptions = {
			headers: headers,
		};

		const body = {
			'userId': u.userId,
			'username': u.username,
			'password': u.password,
			'email': u.email,
			'perm_update': u.perm_update,
			'perm_read': u.perm_read,
			'perm_create': u.perm_create,
			'perm_delete': u.perm_delete
		}

		try {
			this.httpClient.put(`${this.baseURL}/users/update`, body, requestOptions).subscribe((res) => {
					console.log("PUT call successful value returned in body",
						res);
				},
				res => {
					console.log("PUT call in error", res);
				});
		} catch {
		}
	}

	createUser(newUser: User) {
		if (!this.authService.hasPermission('p_create')) return;

		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`
		});

		const requestOptions = {
			headers: headers,
		};

		const body = {
			'username': newUser.username,
			'password': newUser.password,
			'email': newUser.email,
			'perm_update': newUser.perm_update,
			'perm_read': newUser.perm_read,
			'perm_create': newUser.perm_create,
			'perm_delete': newUser.perm_delete
		}

		try {
			console.log(body)
			this.httpClient.post(`${this.baseURL}/users/create`, body, requestOptions).subscribe((val) => {
					console.log("POST call successful value returned in body",
						val);
				},
				response => {
					console.log("POST call in error", response);
				},
				() => {
					console.log("The POST observable is now completed.");
				});
		} catch (e) {
			console.log(e);
		}
	}
}
