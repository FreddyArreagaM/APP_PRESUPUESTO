import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  presupuesto: number;
  restante: number;
  private gastos$ = new Subject<any>();

  constructor() {
    this.presupuesto = 0;
    this.restante = 0;
  }

  //Metodo que se crea para procesar los datos y obtener el gasto del componente ingresar
  agregarGasto(gasto: any) {
    //console.log(this.restante = this.restante - gasto.cantidad);
    this.restante = this.restante - gasto.cantidad;
    this.gastos$.next(gasto); //Permite asignarle a la variable y globalizarla para todos los componentes con el siguiente método
  }

  //Metodo para hacer universal el valor del gasto se utilizan los Observables
  getGastos(): Observable<any> {
    return this.gastos$.asObservable(); //Se van a subcribir todos los componentes que quieran escuchar el cambio de la variable.
  }


}
