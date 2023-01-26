import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Err} from '../models/err';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UserService} from './user.service';

@Injectable({
	providedIn: 'root'
})
export class ErrService {

	private baseURL = 'http://localhost:8090';
	constructor(private httpClient: HttpClient, private authService: AuthService, private userService: UserService) {
	}

	fetchAllErrors(): Observable<Err[]> {
		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}
		const requestOptions = {
			headers: new HttpHeaders(headerDict),
		};
		return this.httpClient.get<Err[]>(`${this.baseURL}/errs`, requestOptions);
	}


}
