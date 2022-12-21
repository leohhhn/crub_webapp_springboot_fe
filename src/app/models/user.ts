export class User {

	userId: number | undefined;
	username: string;
	email: string;
	password: string | undefined = '';
	perm_read: number;
	perm_create: number;
	perm_update: number;
	perm_delete: number;

	constructor(username: string, email: string, perm_read: number, perm_create: number, perm_update: number, perm_delete: number, password?: string,  userId?: number) {
		this.username = username;
		this.email = email;
		this.perm_create = perm_create;
		this.perm_read = perm_read;
		this.perm_update = perm_update;
		this.perm_delete = perm_delete;
		this.userId = userId;
		this.password = password;
	}

}
