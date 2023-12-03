import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    // Creating a spy object for ApiService
    const spy = jasmine.createSpyObj('ApiService', [
      'getuserDetails',
      'getUserRepos',
      'getTotalPages',
    ]);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
      providers: [{ provide: ApiService, useValue: spy }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  it('should handle user not found', fakeAsync(() => {
    apiServiceSpy.getuserDetails.and.returnValue(Promise.reject('User not found'));

    component.onSearch('nonexistentuser');
    tick();

    expect(component.errorMessage).toEqual('User does not exist. Please try another username.');
    expect(component.loadingState).toBe(false);
  }));

});
