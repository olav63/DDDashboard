import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTileComponent } from './app-tile.component';

describe('AppTileComponent', () => {
  let component: AppTileComponent;
  let fixture: ComponentFixture<AppTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
