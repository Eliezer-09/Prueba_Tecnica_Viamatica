import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isLoggedIn(): boolean {
    // Aquí se debe agregar la lógica para verificar si el usuario está logueado
    // Puede ser una verificación de token en el localStorage, por ejemplo
    return !!localStorage.getItem('userToken');
  }
}
