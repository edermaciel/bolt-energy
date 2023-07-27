import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./components/all-users/all-users.module').then(m => m.AllUsersModule)
      }
    ]
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: '**',
    redirectTo: 'homepage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
