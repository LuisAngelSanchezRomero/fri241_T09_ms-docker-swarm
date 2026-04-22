import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuario-list.html',
  styleUrls: ['./usuario-list.css']
})
export class UsuarioListComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  selectedUsuario: Usuario | null = null;
  showModal = false;
  private refreshInterval: any;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    // Refresh automático cada 30 segundos
    this.refreshInterval = setInterval(() => {
      this.cargarUsuarios();
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.error = null;
    
    this.usuarioService.obtenerTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.filteredUsuarios = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error cargando usuarios:', err);
      }
    });
  }

  filtrarUsuarios(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsuarios = this.usuarios;
      return;
    }
    
    const search = this.searchTerm.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(search) ||
      usuario.correo.toLowerCase().includes(search)
    );
  }

  verDetalles(usuario: Usuario): void {
    this.selectedUsuario = usuario;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.selectedUsuario = null;
  }

  eliminarUsuario(id: string | undefined): void {
    if (!id) return;
    
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.loading = true;
      this.usuarioService.eliminar(id).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
    }
  }
}