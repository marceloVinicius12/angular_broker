
import { AcoesService } from './acoes.service';
import { Component,  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, tap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'rxjs';
const espera_digitacao = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent{
  acoesInput = new FormControl();
  todaAcoes$ = this.acoesService.getAcoes().pipe(tap(()=>{
    (console.log('fluxo inical'));
  })
  );
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(espera_digitacao),
    tap(() => {console.log('fluxo de filtro')
  }),
  filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
  distinctUntilChanged(),
    switchMap((valorDigitado) =>  this.acoesService.getAcoes(valorDigitado))
  )
  acoes$ = merge(this.todaAcoes$, this.filtroPeloInput$)

  constructor(private acoesService: AcoesService) {}
}

