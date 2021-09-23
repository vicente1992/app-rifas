import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookCbComponent } from './facebook-cb.component';

describe('FacebookCbComponent', () => {
  let component: FacebookCbComponent;
  let fixture: ComponentFixture<FacebookCbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookCbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookCbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
