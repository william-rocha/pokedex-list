import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pokemon',
    loadChildren: () =>
      import('./pages/pokemon-list/pokemon-list.module').then(
        (m) => m.PokemonListModule
      ),
  },
  { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
