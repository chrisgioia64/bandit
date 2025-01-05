import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentFormComponent } from './experiment-form.component';

describe('ExperimentFormComponent', () => {
  let component: ExperimentFormComponent;
  let fixture: ComponentFixture<ExperimentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperimentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperimentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
