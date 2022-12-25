import {Component} from '@angular/core';
import {Machine} from '../../models/machine';
import {MachineService} from '../../services/machine.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-machine-list',
	templateUrl: './machine-list.component.html',
	styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent {
	machines: Machine[] | undefined;

	constructor(private machineService: MachineService, private router: Router, private authService: AuthService, private route: ActivatedRoute, private userService: UserService) {
	}

	ngOnInit() {
		this.getAllMachines();
	}

	getAllMachines() {
		this.machineService.fetchAllMachines().subscribe(data => {
			console.log(data)
			this.machines = data;
			for (let i = 0; i < this.machines.length; i++) {
				this.machines[i].createdOn = this.machines[i].createdOn.split('T')[0];
			}
			this.machineService.machines = this.machines;
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

	isStopped(m: Machine) {
		return false;
	}


	// Machine operations
	startMachine(m: Machine) {

	}

	stopMachine(m: Machine) {

	}

	restartMachine(m: Machine) {
	}

	destroyMachine(m: Machine) {
		// @ts-ignore
		this.machineService.destroyMachine(m).subscribe((res) => {
				this.reloadMachineList();
			},
			res => {
				console.log('DELETE call in error', res);
			});
	}

	reloadMachineList() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = 'reload';
		this.router.navigate(['./'], {relativeTo: this.route})
	}
}
