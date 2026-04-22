import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 400) {
        errorMessage = 'Datos inválidos. Verifica la información.';
      } else if (error.status === 404) {
        errorMessage = 'Usuario no encontrado';
      } else if (error.status === 409) {
        errorMessage = 'Ya existe un usuario con ese correo';
      } else if (error.status === 500) {
        errorMessage = 'Error del servidor. Intenta más tarde.';
      } else {
        errorMessage = `Código ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Error en API:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        timeout(10000),
        retry(2),
        catchError(this.handleError)
      );
  }

  obtenerPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        timeout(10000),
        retry(1),
        catchError(this.handleError)
      );
  }

  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, { headers: this.getHeaders() })
      .pipe(
        timeout(10000),
        catchError(this.handleError)
      );
  }

  actualizar(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, { headers: this.getHeaders() })
      .pipe(
        timeout(10000),
        catchError(this.handleError)
      );
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        timeout(10000),
        catchError(this.handleError)
      );
  }
}