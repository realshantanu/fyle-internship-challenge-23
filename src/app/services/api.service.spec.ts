import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a defined octokit property', () => {
    expect(service.octokit).toBeDefined();
  });

  it('should fetch user details', (done) => {
    const username = 'realshantanu';

    service.getuserDetails(username).then((result) => {
      expect(result).toBeDefined();
      done();
    });
  });

  it('should handle an error when fetching user details for a nonexistent user', (done) => {
    const username = 'realshantanu12345';

    service.getuserDetails(username).catch((error) => {
      expect(error).toBeDefined();
      done();
    });
  });
});
