import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeziciComponent } from './jezici.component';

describe('JeziciComponent', () => {
  let component: JeziciComponent;
  let fixture: ComponentFixture<JeziciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeziciComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JeziciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
