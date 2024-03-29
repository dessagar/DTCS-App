import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlideComponent } from './create-slide.component';

describe('CreateSlideComponent', () => {
  let component: CreateSlideComponent;
  let fixture: ComponentFixture<CreateSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
