import { Acao, AcoesApi } from './modelo/acoes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, pluck, tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient : HttpClient) { }

getAcoes(valor ?: string){
  const params = valor ? new HttpParams().append('valor',valor) : undefined;
  return this.httpClient.get<AcoesApi>('http://localhost:3000/acoes', {params})
  .pipe(
    tap((valor) => console.log(valor)),
    pluck('payload'), //extrai o atributo deixando apenas o valor
    map((acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA,acaoB)))); //pega o array e realiza um sort
}
private ordenaPorCodigo(acaoA:Acao, acaoB: Acao){
  if(acaoA.codigo > acaoB.codigo){
    return 1;
  }
 if(acaoA.codigo < acaoB.codigo){
   return -1;
 }
return 0;

}



}
