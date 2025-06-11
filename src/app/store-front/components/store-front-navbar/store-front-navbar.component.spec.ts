import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFrontNavbarComponent } from './store-front-navbar.component';

describe('StoreFrontNavbarComponent', () => {
  let component: StoreFrontNavbarComponent;
  let fixture: ComponentFixture<StoreFrontNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFrontNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFrontNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
