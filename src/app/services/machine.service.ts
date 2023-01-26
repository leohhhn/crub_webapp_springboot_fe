import {Injectable} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Machine} from '../models/machine';
import {AuthService} from './auth.service';
import {UserService} from './user.service';

@Injectable({
	providedIn: 'root'
})
export class MachineService {

	machines: Machine[] = [];

	pollInterval = interval(2000);

	private baseURL = 'http://localhost:8090';

	constructor(private httpClient: HttpClient, private authService: AuthService, private userService: UserService) {
	}

	fetchAllMachines(): Observable<Machine[]> {
		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}
		const requestOptions = {
			headers: new HttpHeaders(headerDict),
		};
		return this.httpClient.get<Machine[]>(`${this.baseURL}/users/getMachines`, requestOptions);
	}

	destroyMachine(m: Machine): Observable<Object> | null {
		if (!this.authService.hasPermission('pm_destroy')) return null;
		let machineToDelete = this.machines.find(savedMachine => savedMachine.machineId == m.machineId);

		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}

		const requestOptions = {
			headers: new HttpHeaders(headerDict),
			body: {
				'machineId': m.machineId,
				'name': m.name
			}
		}

		try {
			return this.httpClient.delete(`${this.baseURL}/machines/destroy`, requestOptions);
		} catch {
			console.log('caught e in destroyMachine')
			return null;
		}
	}

	createMachine(machineName: string) {
		if (!this.authService.hasPermission('pm_create')) return;

		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`
		});

		const requestOptions = {
			headers: headers,
		};

		const body = {
			'machineId': '',
			'name': machineName
		}

		try {
			console.log(body)
			this.httpClient.post(`${this.baseURL}/machines/create`, body, requestOptions).subscribe((val) => {
				},
				response => {
					console.log('POST call in error', response);
				},
				() => {
				}
			);
		} catch (e) {
			console.log(e);
		}
	}

	startMachine(m: Machine) {
		if (!this.authService.hasPermission('pm_start')) return;

		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`
		});

		const requestOptions = {
			headers: headers,
		};

		const body = {
			'machineId': m.machineId,
			'name': ''
		}

		try {
			console.log(body)
			this.httpClient.post(`${this.baseURL}/machines/start`, body, requestOptions).subscribe((val) => {
				},
				response => {
					console.log('POST call in error', response);
				},
				() => {
				});
			return;
		} catch (e) {
			console.log(e);
			return;
		}
	}

	stopMachine(m: Machine) {
		if (!this.authService.hasPermission('pm_stop')) return;

		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`
		});

		const requestOptions = {
			headers: headers,
		};

		const body = {
			'machineId': m.machineId,
			'name': ''
		}

		try {
			console.log(body)
			this.httpClient.post(`${this.baseURL}/machines/stop`, body, requestOptions).subscribe((val) => {
				},
				response => {
					console.log('POST call in error', response);
				},
				() => {
				}
			);
		} catch (e) {
			console.log(e);
		}
	}

	restartMachine(m: Machine) {
		if (!this.authService.hasPermission('pm_restart')) return;

		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`
		});

		const requestOptions = {
			headers: headers,
		};

		const body = {
			'machineId': m.machineId,
			'name': ''
		}

		try {
			console.log(body)
			this.httpClient.post(`${this.baseURL}/machines/restart`, body, requestOptions).subscribe((val) => {
				},
				response => {
					console.log('POST call in error', response);
				},
				() => {
				}
			);
		} catch (e) {
			console.log(e);
		}
	}

	fetchMachine(m: Machine): Observable<Machine> {
		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}
		const requestOptions = {
			headers: new HttpHeaders(headerDict),
		};
		const body = {
			'machineId': m.machineId,
			'name': ''
		};

		return this.httpClient.post<Machine>(`${this.baseURL}/machines/find`, body, requestOptions);
	}

	search(dateFrom: Date | undefined, dateTo: Date | undefined, name: string | undefined, status: string | undefined): Observable<Machine[]> | null {
		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}

		const requestOptions = {
			headers: new HttpHeaders(headerDict),
		};

		let tmp = [];
		switch (status) {
			case `RUNNING`:
				tmp[0] = `RUNNING`;
				break;
			case `STOPPED`:
				tmp[0] = `STOPPED`;
				break;
			case `STOPPED & RUNNING`:
				tmp[0] = `RUNNING`;
				tmp[1] = `STOPPED`;
				break;
		}

		const body = {
			'name': name !== undefined ? name : '',
			'statuses': tmp,
			'dateFrom': this.parseDate(dateFrom),
			'dateTo': this.parseDate(dateTo)
		};

		return this.httpClient.post<Machine[]>(`${this.baseURL}/machines/search`, body, requestOptions);
	}

	schedAction(m: Machine, date: Date | undefined, time: string, action: string) {
		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}

		const requestOptions = {
			headers: new HttpHeaders(headerDict),
		};

		let when = this.parseDate(date);
		when = when.concat(' ');
		when = when.concat(time)

		const body = {
			'machineId': m.machineId,
			'action': action,
			'when': when
		};

		this.httpClient.post(`${this.baseURL}/machines/schedule`, body, requestOptions).subscribe((val) => {
			},
			response => {
				console.log('POST call in error', response);
			},
			() => {
			});
	}


	parseDate(date: Date | undefined): string {

		if (date == undefined)
			return '';

		let t = date.toString();

		let split = t.split('-');
		let tmp = split[0];
		split[0] = split[2];
		split[2] = tmp;

		let final = `${split[0]}-${split[1]}-${split[2]}`;

		if (final.indexOf('undefined') >= 0) // hotfixed, cannot figure out why after clearing html datepicker doesnt actually clear
			return '';
		return final;
	}

}
