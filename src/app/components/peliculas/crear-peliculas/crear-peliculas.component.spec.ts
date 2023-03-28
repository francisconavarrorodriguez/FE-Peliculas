import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPeliculasComponent } from './crear-peliculas.component';

describe('CrearPeliculasComponent', () => {
  let component: CrearPeliculasComponent;
  let fixture: ComponentFixture<CrearPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPeliculasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
