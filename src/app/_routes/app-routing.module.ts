import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';
import { WelcomeComponent } from '../_components/welcome/welcome.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'exercises', loadChildren: () => import('../_modules/exercise.module').then(module => module.ExerciseModule), canLoad: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
