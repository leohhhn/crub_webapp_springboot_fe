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
	currentUser: User | undefined; // currently logged-in user

	private baseURL = 'http://localhost:8090';

	constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
	}

	getUserByUsername(username: string): User | undefined {
		// @ts-ignore
		this.users.forEach((u) => {
			if (u.username == username) {
				return u;
			}
		});
		return undefined;
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

	login(username: string, password: string) {
		this.httpClient.post(`${this.baseURL}/auth/login`, {
			username: username,
			password: password
		}).subscribe((res) => {
				localStorage.setItem('jwt', Object.values(res)[0]);
				localStorage.setItem('loggedInUsername', username);
				this.fetchAllUsers().subscribe((res) => {
					this.users=res;
					this.router.navigate(['userList']);
				});

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

	deleteUser(id: number | undefined): Observable<Object> | null {
		if (!this.authService.hasPermission('p_delete')) return null;

		let userToDelete: User;

		this.users.forEach((u) => {
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
				//@ts-ignore
				'username': userToDelete.username,
				'email': '',
				'perm_update': '',
				'perm_read': '',
				'perm_create': '',
				'perm_delete': ''
			}
		}

		try {
			return this.httpClient.delete(`${this.baseURL}/users/delete`, requestOptions);
		} catch {
			return null;
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
			'perm_update': u.p_update,
			'perm_read': u.p_read,
			'perm_create': u.p_create,
			'perm_delete': u.p_delete
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
			'perm_update': newUser.p_update,
			'perm_read': newUser.p_read,
			'perm_create': newUser.p_create,
			'perm_delete': newUser.p_delete
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

	getAllUsers() {
		return this.users;
	}
}
