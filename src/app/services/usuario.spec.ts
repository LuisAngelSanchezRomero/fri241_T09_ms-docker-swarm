import { Usuario } from './usuario';

describe('Usuario Model', () => {
  it('should create a valid usuario object', () => {
    const usuario: Usuario = {
      id: '123',
      nombre: 'Juan Pérez',
      correo: 'juan@email.com'
    };
    
    expect(usuario).toBeDefined();
    expect(usuario.nombre).toBe('Juan Pérez');
    expect(usuario.correo).toBe('juan@email.com');
  });

  it('should allow optional id', () => {
    const usuario: Usuario = {
      nombre: 'María García',
      correo: 'maria@email.com'
    };
    
    expect(usuario.id).toBeUndefined();
    expect(usuario.nombre).toBe('María García');
  });
});