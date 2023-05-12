import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gastos',
  templateUrl: './ingresar-gastos.component.html',
  styleUrls: ['./ingresar-gastos.component.css']
})
export class IngresarGastosComponent implements OnInit {
  nombreGastos: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textoIncorrecto: string;

  constructor(private _prespuestoService: PresupuestoService) {
    this.cantidad = 0;
    this.nombreGastos = '';
    this.formularioIncorrecto = false;
    this.textoIncorrecto = '';
  }

  ngOnInit(): void {

  }

  agregarCantidad() {
    if (this._prespuestoService.restante == 0) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'El dinero se ha acabado';
      return;
    }
    if (this.cantidad > this._prespuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Cantidad ingresada es mayor al restante';
      return;
    }

    if (this.cantidad <= 0 || this.nombreGastos == '') {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Nombre gasto o cantidad incorrecta';
    } else {
      //Creamos el Objeto
      const GASTOS = {
        nombre: this.nombreGastos,
        cantidad: this.cantidad
      }

      //Enviamos el objeto a los subscriptores via subject al servicio presupuesto para procesarlo
      this._prespuestoService.agregarGasto(GASTOS);

      //Reseteamos el formulario


      this.formularioIncorrecto = false;
      this.nombreGastos = '';
      this.cantidad = 0;

    }
  }

}
