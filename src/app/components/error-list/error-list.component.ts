import {Component} from '@angular/core';
import {Err} from '../../models/err';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrService} from '../../services/err.service';

@Component({
	selector: 'app-error-list',
	templateUrl: './error-list.component.html',
	styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent {

	errors: Err[] | undefined;

	constructor(private httpClient: HttpClient, private errService: ErrService) {
	}

	ngOnInit() {
		this.getAllErrs();
	}

	getAllErrs() {
		this.errService.fetchAllErrors().subscribe((data) => {
			console.log(data);
			this.errors = data;
			// @ts-ignore
			for (let i = 0; i < this.errors.length; i++) {
				// @ts-ignore
				let time:string = this.errors[i].createdOn.split('T')[1];
				time = time.substring(0,8)
				// @ts-ignore
				let date = this.errors[i].createdOn.split('T')[0];
				this.errors[i].createdOn = date + " " + time;
			}
		})
	}
}
