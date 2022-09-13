import { TestBed } from '@angular/core/testing';

import { OpenTriviaService } from './open-trivia.service';

describe('OpenTriviaService', () => {
  let service: OpenTriviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTriviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
