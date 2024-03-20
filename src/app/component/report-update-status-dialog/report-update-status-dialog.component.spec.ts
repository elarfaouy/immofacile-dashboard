import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUpdateStatusDialogComponent } from './report-update-status-dialog.component';

describe('ReportUpdateStatusDialogComponent', () => {
  let component: ReportUpdateStatusDialogComponent;
  let fixture: ComponentFixture<ReportUpdateStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportUpdateStatusDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportUpdateStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
