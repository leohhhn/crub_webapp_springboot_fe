import {MachineStatus} from './machine-status';
import {User} from './user';

export class Machine {

	machineId: number;
	name: string = '';
	status: MachineStatus;
	createdBy: User;
	createdOn: string = '';

	constructor(machineId: number, name: string, status: MachineStatus, createdBy: User, createdOn: string) {
		this.machineId = machineId;
		this.name = name;
		this.status = status;
		this.createdBy = createdBy;
		this.createdOn = createdOn.split("T")[0];
	}

}
