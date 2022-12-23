import {MachineStatus} from './machine-status';
import {User} from './user';

export class Machine {

	machineId: number;
	status: MachineStatus;
	createdBy: User;
	active: boolean;

	constructor(machineId: number, status: MachineStatus, createdBy: User, active: boolean) {
		this.machineId = machineId;
		this.status = status;
		this.createdBy = createdBy;
		this.active = active;
	}
}
