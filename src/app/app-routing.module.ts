import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewExperimentsComponent } from './view-experiments/view-experiments.component';
import { AddExperimentComponent } from './add-experiment/add-experiment.component';
import { Experiment1Component } from './experiment1/experiment1.component';
import { ExperimentFormComponent } from './experiment-form/experiment-form.component';

const routes: Routes = [{path:'view', component:ViewExperimentsComponent},
{path:'add', component:AddExperimentComponent},
{path:'view/:experimentId', component:Experiment1Component},
{path: 'addExperiment', component: ExperimentFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
