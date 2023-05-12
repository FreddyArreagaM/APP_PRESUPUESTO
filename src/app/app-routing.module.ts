import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { IngresarPresupuestoComponent } from './components/ingresar-presupuesto/ingresar-presupuesto.component';
import { GastosComponent } from './components/gastos/gastos.component';

const routes: Routes = [
  { path: '', redirectTo: 'ingresarPresupuesto', pathMatch: 'full' }, //Redireccionamiento obligatorio al Usuario 
  { path: 'ingresarPresupuesto', component: IngresarPresupuestoComponent },
  { path: 'gastos', component: GastosComponent },
  { path: '**', redirectTo: 'ingresarPresupuesto', pathMatch: 'full' } //Redireccionamiento para evitar rutas inválidas ingresadas por el usuario
  //Ruta anterior siempre a lo ultimo como un filtro de bloqueo de errores
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
