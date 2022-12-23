export class User {

	userId: number | undefined;
	username: string;
	email: string;
	password: string | undefined = '';

	p_create: number;
	p_read: number;
	p_update: number;
	p_delete: number;

	pm_create: number;
	pm_destroy: number;
	pm_start: number;
	pm_stop: number;
	pm_restart: number;
	pm_search: number;

	constructor(username: string, email: string, p_create: number,
				p_read: number, p_update: number, p_delete: number,
				pm_create: number, pm_destroy: number, pm_start: number,
				pm_stop: number, pm_restart: number, pom_search: number,
				password?: string, userId?: number) {
		this.username = username;
		this.email = email;
		this.p_create = p_create;
		this.p_read = p_read;
		this.p_update = p_update;
		this.p_delete = p_delete;
		this.pm_create = pm_create;
		this.pm_destroy = pm_destroy;
		this.pm_start = pm_start;
		this.pm_stop = pm_stop;
		this.pm_restart = pm_restart;
		this.pm_search = pom_search;
		this.userId = userId;
		this.password = password;
	}

}
