import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from '../_components/exercise/exercise.component';

const routes: Routes = [
    { path: '', component: ExerciseComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class ExerciseRoutingModule {}
