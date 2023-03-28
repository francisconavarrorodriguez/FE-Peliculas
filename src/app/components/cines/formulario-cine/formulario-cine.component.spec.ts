import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCineComponent } from './formulario-cine.component';

describe('FormularioCineComponent', () => {
  let component: FormularioCineComponent;
  let fixture: ComponentFixture<FormularioCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
