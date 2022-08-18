import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionComposerComponent } from './condition-composer.component';

describe('ConditionComposerComponent', () => {
  let component: ConditionComposerComponent;
  let fixture: ComponentFixture<ConditionComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionComposerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
