import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonListComponent } from './pokemon-list.component';
import { ModalContainerComponent } from 'src/app/components/modal-container/modal-container.component';


const routes: Routes = [
  { path: '', component: PokemonListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: ModalContainerComponent, data: { modalData: 'detail' }, pathMatch: 'full'},
  { path: 'comment/:id', component: ModalContainerComponent, data: { modalData: 'comment' }, pathMatch: 'full'},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonListRoutingModule { }
