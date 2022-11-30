import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppContentComponent } from './app-content/app-content.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: ':mfe/:widget',
    component: AppContentComponent,
    children: [
      {
        path: '**',
        children: []
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
