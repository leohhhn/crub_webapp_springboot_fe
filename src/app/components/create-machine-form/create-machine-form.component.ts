import {Component} from '@angular/core';
import {MachineService} from '../../services/machine.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-create-machine-form',
	templateUrl: './create-machine-form.component.html',
	styleUrls: ['./create-machine-form.component.css']
})
export class CreateMachineFormComponent {
	machineName: string = '';

	constructor(private machineService: MachineService, private router: Router) {
	}

	createMachine() {
		this.machineService.createMachine(this.machineName);
		this.router.navigate(['myMachines']);
	}
}
