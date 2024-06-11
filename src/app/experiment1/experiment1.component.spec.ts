import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experiment1Component } from './experiment1.component';

describe('Experiment1Component', () => {
  let component: Experiment1Component;
  let fixture: ComponentFixture<Experiment1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Experiment1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Experiment1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
