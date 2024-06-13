import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'event', pathMatch: 'full' },
  { path: '**', redirectTo: 'event', pathMatch: 'full' },
  { path: 'event', loadChildren: () => import('./events/events.module').then((m) => m.EventsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
