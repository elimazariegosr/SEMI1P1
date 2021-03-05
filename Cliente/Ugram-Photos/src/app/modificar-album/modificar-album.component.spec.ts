import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAlbumComponent } from './modificar-album.component';

describe('ModificarAlbumComponent', () => {
  let component: ModificarAlbumComponent;
  let fixture: ComponentFixture<ModificarAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
