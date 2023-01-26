import {Component} from '@angular/core';
import {MachineService} from '../../services/machine.service';
import {Router} from '@angular/router';
import {delay} from 'rxjs';

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
		delay(100);
		this.router.navigate(['myMachines']);
	}
}
