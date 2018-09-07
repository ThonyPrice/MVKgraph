import { TestBed, inject } from '@angular/core/testing';

import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationService]
    });
  });

  it('should ...', inject([TranslationService], (service: TranslationService) => {
    expect(service).toBeTruthy();
  }));
});
