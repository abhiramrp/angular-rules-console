import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TessComponent } from './tess.component';

describe('TessComponent', () => {
  let component: TessComponent;
  let fixture: ComponentFixture<TessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
