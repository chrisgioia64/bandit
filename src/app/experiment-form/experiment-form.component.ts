import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ExperimentService } from '../experiment.service';

@Component({
  selector: 'app-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.css'],
})
export class ExperimentFormComponent {
  experimentForm: FormGroup;

  constructor(private fb: FormBuilder, private experimentService: ExperimentService) {
    this.experimentForm = this.fb.group({
      name: ['', Validators.required],
      timeHorizon: [50, [Validators.required, Validators.min(1), Validators.max(100)]],
      distributions: this.fb.array([]), // Dynamic distributions
    });

    this.addComponent(); // Add at least one distribution by default
  }

  get distributions(): FormArray {
    return this.experimentForm.get('distributions') as FormArray;
  }

  addComponent(): void {
    const distributionGroup = this.fb.group({
      type: ['Bernoulli', Validators.required], // Default to Bernoulli
      p: [null, [Validators.min(0), Validators.max(1)]], // Parameter for Bernoulli
      mean: [null], // Mean for Normal
      stdDev: [null], // Standard deviation for Normal
    });

    this.updateValidators(distributionGroup);
    this.distributions.push(distributionGroup);
  }

  removeComponent(index: number): void {
    this.distributions.removeAt(index);
  }

  onDistributionChange(index: number): void {
    // const distributionGroup = this.distributions.at(index);
    // this.updateValidators((FormGroup) distributionGroup);
    const distributionGroup = this.distributions.at(index) as FormGroup; // Explicit cast
    this.updateValidators(distributionGroup);
  }

  updateValidators(distributionGroup: FormGroup): void {
    const type = distributionGroup.get('type')?.value;

    if (type === 'Bernoulli') {
      distributionGroup.get('p')?.setValidators([Validators.required, Validators.min(0), Validators.max(1)]);
      distributionGroup.get('mean')?.clearValidators();
      distributionGroup.get('stdDev')?.clearValidators();
    } else if (type === 'Normal') {
      distributionGroup.get('p')?.clearValidators();
      distributionGroup.get('mean')?.setValidators(Validators.required);
      distributionGroup.get('stdDev')?.setValidators(Validators.required);
    }

    distributionGroup.get('p')?.updateValueAndValidity();
    distributionGroup.get('mean')?.updateValueAndValidity();
    distributionGroup.get('stdDev')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.experimentForm.valid) {
      const experimentData = this.experimentForm.value;
      this.experimentService.submitExperiment(experimentData).subscribe({
        next: (response) => {
          console.log('Experiment submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting experiment:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}