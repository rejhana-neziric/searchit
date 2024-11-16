import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCandidateComponent } from './chat-candidate.component';

describe('ChatCandidateComponent', () => {
  let component: ChatCandidateComponent;
  let fixture: ComponentFixture<ChatCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatCandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
