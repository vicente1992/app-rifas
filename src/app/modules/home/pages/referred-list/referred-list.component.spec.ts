import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredListComponent } from './referred-list.component';

describe('ReferredListComponent', () => {
  let component: ReferredListComponent;
  let fixture: ComponentFixture<ReferredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferredListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
