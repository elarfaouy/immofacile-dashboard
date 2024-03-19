import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUpdateStatusDialogComponent } from './property-update-status-dialog.component';

describe('PropertyUpdateStatusDialogComponent', () => {
  let component: PropertyUpdateStatusDialogComponent;
  let fixture: ComponentFixture<PropertyUpdateStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyUpdateStatusDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyUpdateStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
