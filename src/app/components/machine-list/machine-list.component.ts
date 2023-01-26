import {Component} from '@angular/core';
import {Machine} from '../../models/machine';
import {MachineService} from '../../services/machine.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MachineStatus} from '../../models/machine-status';
import {Subscription, take} from 'rxjs';

@Component({
	selector: 'app-machine-list',
	templateUrl: './machine-list.component.html',
	styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent {
	machines: Machine[] | undefined;

	searchMachineName: any;
	searchStatus: any;
	searchDateFrom: Date | undefined;
	searchDateTo: Date | undefined;

	schedDate: Date | undefined;
	schedTime: string | undefined;
	schedAction: any;

	constructor(private machineService: MachineService, private router: Router, private authService: AuthService, private route: ActivatedRoute, private userService: UserService) {
	}

	ngOnInit() {
		this.getAllMachines();
	}

	getAllMachines() {
		this.machineService.fetchAllMachines().subscribe(data => {
			this.machines = data;
			this.fixTimestamp();
			this.machineService.machines = this.machines;
		});
	}

	// Machine operations
	startMachine(m: Machine) {
		this.machineService.startMachine(m);
		this.pollMachineStatus(m, MachineStatus.RUNNING);
	}


	stopMachine(m: Machine) {
		this.machineService.stopMachine(m);
		this.pollMachineStatus(m, MachineStatus.STOPPED);
	}

	restartMachine(m: Machine) {
		this.machineService.restartMachine(m);
		this.pollMachineStatus(m, null);

	}

	destroyMachine(m: Machine) {
		// @ts-ignore
		let machineToDelete = this.machines.find(savedMachine => savedMachine.machineId == m.machineId);
		// @ts-ignore
		this.removeMachineFromMachineList(machineToDelete);

		// @ts-ignore
		this.machineService.destroyMachine(m).subscribe((res) => {
				this.removeMachineFromMachineList(m);
			},
			res => {
				console.log('DELETE call in error', res);
			});
	}

	removeMachineFromMachineList(m: Machine) {
		// @ts-ignore
		this.machines.forEach((value, index) => {
			if (value == m) { // @ts-ignore
				this.machines.splice(index, 1);
			}
		});
	}

	updateMachineFromMachineList(m: Machine) {
		// @ts-ignore
		for (let i = 0; i < this.machines.length; i++) {
			// @ts-ignore
			if (this.machines[i].machineId == m.machineId) {
				// @ts-ignore
				this.machines[i] = m;
				break;
			}
		}
		this.fixTimestamp()
	}

	searchMachines() {
		// @ts-ignore
		this.machineService.search(this.searchDateFrom, this.searchDateTo, this.searchMachineName, this.searchStatus).subscribe((data) => {
			this.machines = data;
			this.fixTimestamp();
		});
	}

	scheduleAction(m: Machine) {
		if (this.schedAction === undefined || this.schedTime === undefined || this.schedDate === undefined) {
			alert('All schedule fields must be filled out')
			return;
		}
		this.machineService.schedAction(m, this.schedDate, this.schedTime, this.schedAction);
	}

	pollMachineStatus(m: Machine, ms: MachineStatus | null) {
		let sub: Subscription;
		sub = this.machineService.pollInterval.pipe(take(8)).subscribe(() => {
			let flag = 0;
			// @ts-ignore
			this.machineService.fetchMachine(m).subscribe(
				(res) => {
					console.log(res)
					this.updateMachineFromMachineList(res)
					if (ms === null) {
						if (m.status == MachineStatus.STOPPED)
							flag++;
						if (flag == 1 && m.status == MachineStatus.RUNNING) {
							// @ts-ignore
							sub.unsubscribe();
						}
					}
					if (res.status == ms)
						// @ts-ignore
						sub.unsubscribe();
				}
			)
		});
	}

	// View functions

	hasStartPermission() {
		return this.authService.hasPermission('pm_start');
	}

	hasStopPermission() {
		return this.authService.hasPermission('pm_stop');
	}

	hasRestartPermission() {
		return this.authService.hasPermission('pm_restart');
	}

	hasDestroyPermission() {
		return this.authService.hasPermission('pm_destroy');
	}

	hasSearchPermission() {
		return this.authService.hasPermission('pm_search');
	}

	isStopped(m: Machine) {
		return m.status === MachineStatus.STOPPED;
	}

	fixTimestamp() {
		// @ts-ignore
		for (let i = 0; i < this.machines.length; i++) {
			// @ts-ignore
			this.machines[i].createdOn = this.machines[i].createdOn.split('T')[0];
		}
	}


}



