import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { provideHttpClient } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
