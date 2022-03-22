import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially be an empty array', () => {
    expect(service.messages).toEqual([]);
  });

  it('should clear messages', () => {
    service.add('1');
    service.add('2');
    service.clear();
    expect(service.messages).toEqual([]);
  });

  it('add 1 message', () => {
    service.add('1');
    expect(service.messages).toEqual(['1']);
  });

  it('add 3 messages', () => {
    service.add('1');
    service.add('two');
    service.add('third message');
    expect(service.messages).toEqual(['1', 'two', 'third message']);
  });
});
