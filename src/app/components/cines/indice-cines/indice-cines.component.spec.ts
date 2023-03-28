import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceCinesComponent } from './indice-cines.component';

describe('IndiceCinesComponent', () => {
  let component: IndiceCinesComponent;
  let fixture: ComponentFixture<IndiceCinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiceCinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiceCinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
