import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { By } from '@angular/platform-browser';
import { SpyLocation } from '@angular/common/testing';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeroDetailComponent],
      providers: [{ provide: Location, useClass: SpyLocation }],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() makes expected calls', () => {
    spyOn(component, 'getHero').and.callThrough();
    component.ngOnInit();
    expect(component.getHero).toHaveBeenCalled();
  });

  it('getHero makes expected calls', () => {
    const heroServiceStub: HeroService =
      fixture.debugElement.injector.get(HeroService);
    spyOn(heroServiceStub, 'getHero').and.callThrough();
    component.getHero();
    expect(heroServiceStub.getHero).toHaveBeenCalled();
  });

  it('goBack makes expected calls', () => {
    spyOn(component, 'goBack').and.callThrough();
    component.goBack();
    expect(component.goBack).toHaveBeenCalled();
  });

  it('save makes expected calls', () => {
    component.hero = { id: 1, name: 'A' };
    spyOn(component, 'save').and.callThrough();
    component.save();
    expect(component.save).toHaveBeenCalled();
  });

  it("Doesn't initially display anything", () => {
    fixture.detectChanges();
    const anyDiv = fixture.debugElement.query(By.css('div'));
    expect(anyDiv).toBeFalsy();
  });

  it('With a hero', async () => {
    component.hero = { id: 1, name: 'Abc' };
    fixture.detectChanges();
    const anyDiv = fixture.debugElement.query(By.css('div'));
    expect(anyDiv).toBeTruthy();
    const header: HTMLHeadingElement = fixture.debugElement.query(
      By.css('h2')
    ).nativeElement;
    expect(header.textContent).toContain('ABC Details');
    const div: HTMLDivElement = fixture.debugElement.query(
      By.css('div div') // first inner div
    ).nativeElement;
    expect(div.textContent).toContain('id: 1');
    await fixture.whenStable();
    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    expect(input.value).toBe('Abc');
  });

  it('Updates hero property when user types on the input', () => {
    component.hero = { id: 1, name: 'Abc' };
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    input.value = 'ABC';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.hero.name).toBe('ABC');
  });
});
