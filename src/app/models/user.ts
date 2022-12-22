export class User {

	userId: number | undefined;
	username: string;
	email: string;
	password: string | undefined = '';

	perm_create: number;
	perm_read: number;
	perm_update: number;
	perm_delete: number;

	perm_mach_create: number;
	perm_mach_destroy: number;
	perm_mach_start: number;
	perm_mach_stop: number;
	perm_mach_restart: number;
	perm_mach_search: number;

	constructor(username: string, email: string, perm_create: number,
				perm_read: number, perm_update: number, perm_delete: number,
				perm_mach_create: number, perm_mach_destroy: number, perm_mach_start: number,
				perm_mach_stop: number, perm_mach_restart: number, perm_mach_search: number,
				password?: string, userId?: number) {
		this.username = username;
		this.email = email;
		this.perm_create = perm_create;
		this.perm_read = perm_read;
		this.perm_update = perm_update;
		this.perm_delete = perm_delete;
		this.perm_mach_create = perm_mach_create;
		this.perm_mach_destroy = perm_mach_destroy;
		this.perm_mach_start = perm_mach_start;
		this.perm_mach_stop = perm_mach_stop;
		this.perm_mach_restart = perm_mach_restart;
		this.perm_mach_search = perm_mach_search;
		this.userId = userId;
		this.password = password;
	}

}
