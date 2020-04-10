import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  // Interceptor
  obtenerUsuariosInterceptor() {
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'David Robinson');

    return this.http.get(`https://reqres.in/api/user`, {
      params
    })
    .pipe(
      map((resp: any) => resp['data']),
      catchError(this.manejarError)
    );
  }

  // Tradicional
  obtenerUsuarios() {
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'David Robinson');

    const headers = new HttpHeaders({
      'token-usuario': 'ASFASDFGSFD4545325345'
    });

    return this.http.get(`https://reqres.in/api/user`, {
      params,
      headers
    })
    .pipe(
      map((resp: any) => resp['data']),
      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse) {
    console.warn(error);

    return throwError('Error personalizado');
  }
}
