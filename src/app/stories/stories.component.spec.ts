import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { StoriesService } from './stories.service';
import { HttpErrorHandler } from '../http-error-handler.service';
import { MessageService } from '../message.service';
import { StoriesComponent } from './stories.component';

describe('StoriesService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let storyService: StoriesService;
    let component: StoriesComponent;
    let fixture: ComponentFixture<StoriesComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        // Import the HttpClient mocking services
        imports: [ HttpClientTestingModule ],
        // Provide the service-under-test and its dependencies
        providers: [
          StoriesService,
          HttpErrorHandler,
          MessageService
        ]
      });
  
      // Inject the http, test controller, and service-under-test
      // as they will be referenced by each test.
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      storyService = TestBed.inject(StoriesService);
    });
  
    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });
  
    /// HeroService method tests begin ///
  

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storyService = TestBed.inject(StoriesService);
  });

  it('should return max story number(called once)', () => {

    storyService.getStoryIds("maxitem").subscribe(
        (stories: Array<number>) => expect(stories.length).toBeGreaterThan(1, 'should return expected heroes'),
      fail
    );

    // HeroService should have made one request to GET heroes from expected URL
    const req = httpTestingController.expectOne(storyService.storyUrl + 'maxitem.json');
    expect(req.request.method).toEqual('GET');
  });


  it('#openLink should open the link in browser if url is present', () => {
    const windowOpenSpy = spyOn(window, 'open');
    const testUrl = 'https://abc.com';
    component.openLink(testUrl);
    expect(windowOpenSpy.calls.count()).toEqual(1);
    expect(windowOpenSpy.calls.allArgs()[0][0]).toEqual(testUrl);
  });

  it('#openLink should do nothing if url is not present', () => {
    const windowOpenSpy = spyOn(window, 'open');
    const testUrl = '';
    component.openLink(testUrl);
    expect(windowOpenSpy.calls.count()).toEqual(0);
  });

});
