// src/app/components/usuario-form/usuario-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuario-form.html',
  styleUrls: ['./usuario-form.css']
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup;
  isEditMode = false;
  usuarioId: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(150)]]
    });
  }

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.usuarioId;
    
    if (this.isEditMode && this.usuarioId) {
      this.cargarUsuario();
    }
  }

  cargarUsuario(): void {
    this.loading = true;
    this.usuarioService.obtenerPorId(this.usuarioId!).subscribe({
      next: (usuario) => {
        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          correo: usuario.correo
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      Object.keys(this.usuarioForm.controls).forEach(key => {
        this.usuarioForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.error = null;

    const usuario = this.usuarioForm.value;

    if (this.isEditMode && this.usuarioId) {
      this.usuarioService.actualizar(this.usuarioId, usuario).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
    } else {
      this.usuarioService.crear(usuario).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
    }
  }
}