import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExperimentComponent } from './add-experiment.component';

describe('AddExperimentComponent', () => {
  let component: AddExperimentComponent;
  let fixture: ComponentFixture<AddExperimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExperimentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
