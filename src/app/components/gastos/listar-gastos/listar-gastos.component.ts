import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styleUrls: ['./listar-gastos.component.css']
})
export class ListarGastosComponent implements OnInit, OnDestroy {
  subscription: Subscription; //Variable para trabajar la desubscripcion 
  presupuesto: number;
  restante: number;
  listGastos: any[] = [];

  constructor(private _presupuestoService: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
    this.subscription = this._presupuestoService.getGastos().subscribe(data => {
      this.restante = this.restante - data.cantidad; //Operación para obtener el valor del restante en base a la cantidad del gasto ingresado
      this.listGastos.push(data); //Agregamos los gastos en el Array de lista de gastos 
    })
  }

  ngOnInit(): void {
    this.presupuesto = this._presupuestoService.presupuesto; //Asignacion del valor del presupuesto traído del servicio
    this.restante = this._presupuestoService.restante; //Asignación del valor del restante traído del servicio	
  }

  //Metodo para eliminar la subcripción lo que significa que una vez que se haya
  //obtenido el valor se corte y así no aparezca repetido 2 veces
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  aplicarColorRestante() {
    if (this.presupuesto / 4 > this.restante) {
      return 'alert alert-danger';
    } else if (this.presupuesto / 2 > this.restante) {
      return 'alert alert-warning';
    } else {
      return 'alert alert-secondary';
    }

  }

}
