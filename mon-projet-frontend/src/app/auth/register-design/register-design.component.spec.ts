import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDesignComponent } from './register-design.component';

describe('RegisterDesignComponent', () => {
  let component: RegisterDesignComponent;
  let fixture: ComponentFixture<RegisterDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
