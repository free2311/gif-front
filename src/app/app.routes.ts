import { Routes } from '@angular/router';
import { TabsPageComponent } from './tabs-page/tabs-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', component: TabsPageComponent },
  { path: '**', redirectTo: 'tabs' },
];
