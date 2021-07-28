import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {RouteGuardService} from './services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule),
    canActivate: [RouteGuardService]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
