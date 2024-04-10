import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotationListComponent } from './cotation-list.component';

describe('CotationListComponent', () => {
  let component: CotationListComponent;
  let fixture: ComponentFixture<CotationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
