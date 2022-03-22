import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HeroService with get spies', () => {
  let heroService: HeroService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let messageService: MessageService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageService = new MessageService();
    heroService = new HeroService(messageService, httpClientSpy);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedHeroes: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    httpClientSpy.get.and.returnValue(of(expectedHeroes));

    heroService.getHeroes().subscribe({
      next: (heroes) => {
        expect(heroes).withContext('expected heroes').toEqual(expectedHeroes);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return expected hero (HttpClient called once)', (done: DoneFn) => {
    const expectedHero: Hero = { id: 1, name: 'A' };

    httpClientSpy.get.and.returnValue(of(expectedHero));

    heroService.getHero(1).subscribe({
      next: (hero) => {
        expect(hero).withContext('expected hero').toEqual(expectedHero);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should search for expected hero (HttpClient called once)', (done: DoneFn) => {
    const Heroes: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    httpClientSpy.get.and.returnValue(of(Heroes));

    heroService.searchHeroes('A').subscribe({
      next: (hero) => {
        expect(hero).withContext('expected hero').toEqual(Heroes);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});

describe('HeroService with put spies', () => {
  let heroService: HeroService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let messageService: MessageService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    messageService = new MessageService();
    heroService = new HeroService(messageService, httpClientSpy);
  });

  it('should add expected hero (HttpClient called once)', (done: DoneFn) => {
    const expectedHero: Hero = { id: 1, name: 'A' };

    httpClientSpy.put.and.returnValue(of(expectedHero));

    heroService.updateHero(expectedHero).subscribe({
      next: (heroes) => {
        expect(heroes).withContext('expected heroes').toEqual(expectedHero);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.put.calls.count()).withContext('one call').toBe(1);
  });
});

describe('HeroService with post spies', () => {
  let heroService: HeroService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let messageService: MessageService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    messageService = new MessageService();
    heroService = new HeroService(messageService, httpClientSpy);
  });

  it('should post expected hero (HttpClient called once)', (done: DoneFn) => {
    const expectedHero: Hero = { id: 1, name: 'A' };

    httpClientSpy.post.and.returnValue(of(expectedHero));

    heroService.addHero(expectedHero).subscribe({
      next: (heroes) => {
        expect(heroes).withContext('expected heroes').toEqual(expectedHero);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });
});

describe('HeroService with delete spies', () => {
  let heroService: HeroService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let messageService: MessageService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);
    messageService = new MessageService();
    heroService = new HeroService(messageService, httpClientSpy);
  });

  it('should delete expected hero (HttpClient called once)', (done: DoneFn) => {
    const expectedHero: Hero = { id: 1, name: 'A' };

    httpClientSpy.delete.and.returnValue(of(expectedHero));

    heroService.deleteHero(1).subscribe({
      next: (heroes) => {
        expect(heroes).withContext('expected heroes').toEqual(expectedHero);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.delete.calls.count()).withContext('one call').toBe(1);
  });
});

describe('HeroService with mocks', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('getHeroes should return heroes', () => {
    const expectedHeroes: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    heroService.getHeroes().subscribe({
      next: (heroes) =>
        expect(heroes)
          .withContext('should return expected heroes')
          .toEqual(expectedHeroes),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedHeroes);
  });

  it('getHeroes can return multiple times', () => {
    const expectedHeroes: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    const expectedHeroes2: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ];
    const expectedHeroes3: Hero[] = [{ id: 1, name: 'A' }];

    heroService.getHeroes().subscribe();
    heroService.getHeroes().subscribe();
    heroService.getHeroes().subscribe({
      next: (heroes) =>
        expect(heroes)
          .withContext('should return expected heroes')
          .toEqual(expectedHeroes3),
      error: fail,
    });

    const req = httpTestingController.match('api/heroes');
    expect(req.length).toEqual(3);

    req[0].flush(expectedHeroes);
    req[1].flush(expectedHeroes2);
    req[2].flush(expectedHeroes3);
  });

  it('getHeroes can return no heroes', () => {
    heroService.getHeroes().subscribe({
      next: (heroes) =>
        expect(heroes).withContext('should return no heroes').toEqual([]),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');

    req.flush([]);
  });

  it('getHeroes can handle 404', () => {
    const message = 'test error';
    heroService
      .getHeroes()
      .subscribe((heroes) => expect(heroes).toEqual([]), fail);

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');

    req.flush(message, { status: 404, statusText: 'Not found' });
  });

  it('getHero should get a hero', () => {
    const getHero: Hero = { id: 1, name: 'A' };

    heroService.getHero(1).subscribe({
      next: (data) =>
        expect(data).withContext('should return the hero').toEqual(getHero),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('GET');

    req.flush(getHero);
  });

  it('getHero can handle 404', () => {
    const message = 'test error';
    heroService
      .getHero(1)
      .subscribe((response) => expect(response).toBeUndefined(), fail);

    const req = httpTestingController.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('GET');

    req.flush(message, { status: 404, statusText: 'Not found' });
  });

  it('updateHero should update a hero', () => {
    const updateHero: Hero = { id: 1, name: 'A' };

    heroService.updateHero(updateHero).subscribe({
      next: (data) =>
        expect(data).withContext('should return the hero').toEqual(updateHero),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(updateHero);

    const expectedResponse = new HttpResponse({
      status: 200,
      statusText: 'OK',
      body: updateHero,
    });
    req.event(expectedResponse);
  });

  it('updateHero can handle 404', () => {
    const message = 'test error';
    heroService
      .updateHero({ id: 1, name: 'A' })
      .subscribe((response) => expect(response).toBeUndefined(), fail);

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('PUT');

    req.flush(message, { status: 404, statusText: 'Not found' });
  });

  it('addHero should add a hero', () => {
    const addHero: Hero = { id: 1, name: 'A' };

    heroService.addHero(addHero).subscribe({
      next: (data) =>
        expect(data).withContext('should return the hero').toEqual(addHero),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');

    req.flush(addHero);
  });

  it('addHero can handle 404', () => {
    const message = 'test error';
    heroService
      .addHero({ id: 1, name: 'A' })
      .subscribe((response) => expect(response).toBeUndefined(), fail);

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');

    req.flush(message, { status: 404, statusText: 'Not found' });
  });

  it('deleteHero should delete a hero', () => {
    const deleteHero: Hero = { id: 1, name: 'A' };

    heroService.deleteHero(1).subscribe({
      next: (data) =>
        expect(data).withContext('should return the hero').toEqual(deleteHero),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('DELETE');

    req.flush(deleteHero);
  });

  it('deleteHero can handle 404', () => {
    const message = 'test error';
    heroService
      .deleteHero(1)
      .subscribe((response) => expect(response).toBeUndefined(), fail);

    const req = httpTestingController.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('DELETE');

    req.flush(message, { status: 404, statusText: 'Not found' });
  });

  it('searchHeroes should return an empty array for whitespace', () => {
    heroService.searchHeroes(' ').subscribe({
      next: (data) =>
        expect(data).withContext('should return empty array').toEqual([]),
      error: fail,
    });
  });

  it('searchHeroes can return a hero', () => {
    const searchHero: Hero[] = [{ id: 1, name: 'A' }];

    heroService.searchHeroes('A').subscribe({
      next: (data) =>
        expect(data).withContext('should return the hero').toEqual(searchHero),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes/?name=A');
    expect(req.request.method).toEqual('GET');

    req.flush(searchHero);
  });

  it('searchHeroes can return an array of heroes', () => {
    const searchHero: Hero[] = [
      { id: 1, name: 'Abc' },
      { id: 2, name: 'Abcd' },
    ];

    heroService.searchHeroes('Ab').subscribe({
      next: (data) =>
        expect(data).withContext('should return the hero').toEqual(searchHero),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes/?name=Ab');
    expect(req.request.method).toEqual('GET');

    req.flush(searchHero);
  });

  it('searchHeroes can return an empty array', () => {
    heroService.searchHeroes('Ab').subscribe({
      next: (data) =>
        expect(data).withContext('should return the hero').toEqual([]),
      error: fail,
    });

    const req = httpTestingController.expectOne('api/heroes/?name=Ab');
    expect(req.request.method).toEqual('GET');

    req.flush([]);
  });

  it('searchHeroes can handle 404', () => {
    const message = 'test error';
    heroService
      .searchHeroes('Abc')
      .subscribe((response) => expect(response).toEqual([]), fail);

    const req = httpTestingController.expectOne('api/heroes/?name=Abc');
    expect(req.request.method).toEqual('GET');

    req.flush(message, { status: 404, statusText: 'Not found' });
  });
});
