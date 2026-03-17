import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToysComponent} from '../toys.component';


describe('ToysComponent', () => {
  let component: ToysComponent;
  let fixture: ComponentFixture<ToysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToysComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
