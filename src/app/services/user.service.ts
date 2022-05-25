import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url:string = 'https://hiberus-test-api.up.railway.app/users/';

  constructor(
    public _http: HttpClient,
	public cookieService: CookieService
  ) { }

  	saveUser(user: any): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url, params, {headers:headers});
	}

	updateUser(userId:string, user:any): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+userId, params, {headers:headers});
	}

	getUsers(limit:number = 5, page:number = 1): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(`${this.url}${limit}/${page}`,  {headers:headers});
	}

	getUser(userId:string): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+userId, {headers:headers});
	}

	deleteUser(userId:string): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+userId, {headers:headers});
	}


}
