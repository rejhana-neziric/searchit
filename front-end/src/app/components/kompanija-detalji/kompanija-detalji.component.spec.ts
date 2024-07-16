import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KompanijaDetaljiComponent } from './kompanija-detalji.component';

describe('KompanijaDetaljiComponent', () => {
  let component: KompanijaDetaljiComponent;
  let fixture: ComponentFixture<KompanijaDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KompanijaDetaljiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KompanijaDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
