import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url:string = 'https://hiberus-test-api.up.railway.app/auth/';

  constructor(
    public _http: HttpClient,
	public cookieService: CookieService
  ) { }

  	register(user: any): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'register', params, {headers:headers});
	}

	login(user:any): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'login', params, {headers:headers});
	}

	logout(){
		this.cookieService.delete('identity');
		this.cookieService.delete('token')
	}

	setIdentity(user:any){
		this.cookieService.set('identity', JSON.stringify(user));
		
	}

	getIdentity(){
		if(this.cookieService.check('identity')){
			return JSON.parse(this.cookieService.get('identity'));
		}
		
	}

	setToken(token:string){
		this.cookieService.set('token', token);
	}

	getToken(){
		this.cookieService.get('token');
	}


}
