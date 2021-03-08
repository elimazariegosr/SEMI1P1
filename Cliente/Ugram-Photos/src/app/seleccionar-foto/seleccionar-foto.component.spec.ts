import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarFotoComponent } from './seleccionar-foto.component';

describe('SeleccionarFotoComponent', () => {
  let component: SeleccionarFotoComponent;
  let fixture: ComponentFixture<SeleccionarFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarFotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
