import {Injectable} from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() {
	}

	// @ts-ignore
	hasPermission(permToCheckFor: string): boolean {

		try {
			let decodedJWT: Object = jwtDecode(<string>localStorage.getItem('jwt'))

			// @ts-ignore
			const val: number = decodedJWT[permToCheckFor];

			// if (val === 1)
			// {
			// 	console.log("val is equal to 1")
			// 	return true;
			// }
			// return false;
			//

			// @ts-ignore
			return decodedJWT[permToCheckFor] == 1;
		} catch (e) {
			// console.log(e);
			// console.log(permToCheckFor);
			// console.log("sing in to get token"); //todo see why constantly being pulled?
		}


	}

	getCurrentUsername(): string {
		let decodedJWT: Object = jwtDecode(<string>localStorage.getItem('jwt'));
		Object.keys(decodedJWT).find((p) => {
			if (p === 'username') {
				// @ts-ignore
				return decodedJWT[p];
			}
		});
		return '';
	}

	removeJWT() {
		localStorage.removeItem('jwt');
	}
}
