export class User {
	constructor(
		public _id: string,
		public email: string,
		public password: string,
        public name: string,
		public surname: string,
		public role: string,
		public createdAt: string,
        public updatedAt: string,
	){}
}
