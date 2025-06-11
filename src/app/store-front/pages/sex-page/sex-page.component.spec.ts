import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexPageComponent } from './sex-page.component';

describe('SexPageComponent', () => {
  let component: SexPageComponent;
  let fixture: ComponentFixture<SexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SexPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
