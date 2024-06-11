import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../experiment.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-experiment',
  templateUrl: './add-experiment.component.html',
  styleUrl: './add-experiment.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ]
})
export class AddExperimentComponent implements OnInit {

  formGroup : FormGroup;
  distributions : any = [];
  parameters : any = [];

  constructor(private expService : ExperimentService, private builder : FormBuilder) {
    this.formGroup = new FormGroup({
      n: new FormControl(),
      // distributions: this.builder.array([
      //   new FormControl(),
      //   new FormControl()
      // ])
    });
    this.distributions = ['Bernoulli'];
    this.parameters = [['p']];
  }

  ngOnInit(): void {

  }

  getDistributionControls() {
    return (<FormArray>this.formGroup.get('distributions')).controls;
  }

  addDistributionControl() {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.formGroup.get('distributions')).push(control);
  }

  clickButton() {
    let controls = this.getDistributionControls();
    for (let i = 0; i < controls.length; i++) {
      console.log(this.formGroup.get(i + "")?.value);
    }
    console.log(this.formGroup.get("n")?.value);
  }

}
