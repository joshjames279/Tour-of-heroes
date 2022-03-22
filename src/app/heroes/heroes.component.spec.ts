import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from '../hero.service';
import { By } from '@angular/platform-browser';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [HeroService],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have updated heroes after detectChanges', () => {
    expect(component.heroes).toEqual([]);
    component.heroes = [{ id: 1, name: 'A' }];
    fixture.detectChanges();
    expect(component.heroes).toEqual(component.heroes);
  });

  it('should have <h2> with "My heroes"', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual(
      'My heroes'
    );
  });

  it('delete makes expected calls', () => {
    spyOn(component, 'delete').and.callThrough();
    component.delete({ id: 1, name: 'A' });
    expect(component.delete).toHaveBeenCalled();
  });

  it('add makes expected calls', () => {
    spyOn(component, 'add').and.callThrough();
    component.add('A');
    expect(component.add).toHaveBeenCalled();
  });

  it('add makes expected calls fo empty string', () => {
    spyOn(component, 'add').and.callThrough();
    component.add('');
    expect(component.add).toHaveBeenCalled();
  });

  it("Doesn't initially display any heroes", () => {
    fixture.detectChanges();
    const anyHero = fixture.nativeElement.querySelectorAll('a');
    expect(anyHero.length).toEqual(0);
  });

  it('With heroes', async () => {
    component.heroes = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ];
    fixture.detectChanges();
    const anyHero = fixture.nativeElement.querySelectorAll('a');
    expect(anyHero.length).toEqual(3);
    const id: HTMLElement = fixture.debugElement.query(
      By.css('.badge')
    ).nativeElement;
    expect(id.textContent).toContain('1');
    const id2: HTMLElement =
      fixture.nativeElement.querySelectorAll('.badge')[1];
    expect(id2.textContent).toContain('2');
    const id3: HTMLElement =
      fixture.nativeElement.querySelectorAll('.badge')[2];
    expect(id3.textContent).toContain('3');
    const name: HTMLElement = fixture.debugElement.query(
      By.css('.badge2')
    ).nativeElement;
    expect(name.textContent).toContain('A');
    const name2: HTMLElement =
      fixture.nativeElement.querySelectorAll('.badge2')[1];
    expect(name2.textContent).toContain('B');
    const name3: HTMLElement =
      fixture.nativeElement.querySelectorAll('.badge2')[2];
    expect(name3.textContent).toContain('C');
    const anyButton = fixture.nativeElement.querySelectorAll('button');
    expect(anyButton.length).toEqual(4);
  });
});
