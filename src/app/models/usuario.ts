export interface Usuario {
  id?: string;
  nombre: string;
  correo: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}