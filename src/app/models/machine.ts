import {MachineStatus} from './machine-status';
import {User} from './user';

export class Machine {

	machineId: number;
	name: string = '';
	status: MachineStatus;
	createdBy: User;
	active: boolean;
	createdOn: string = '';

	constructor(machineId: number, name: string, status: MachineStatus, createdBy: User, active: boolean, createdOn: string) {
		this.machineId = machineId;
		this.name = name;
		this.status = status;
		this.createdBy = createdBy;
		this.active = active;
		this.createdOn = createdOn.split("T")[0];
	}

}
