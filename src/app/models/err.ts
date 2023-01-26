import {User} from './user';

export class Err {

	errorId: number | undefined;
	message: string = '';
	createdOn: string | undefined; // todo see how it parses from java
	createdBy: User | undefined;

	constructor(errorId: number, message: string, createdOn: string, createdBy: User) {
		this.errorId = errorId;
		this.message = message;
		this.createdOn = createdOn;
		this.createdBy = createdBy;
	}

}
