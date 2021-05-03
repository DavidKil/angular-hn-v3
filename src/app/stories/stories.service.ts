import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Story } from './story';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class StoriesService {
  storyUrl = 'https://hacker-news.firebaseio.com/v0/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('StoriesService');
  }

  getStoryIds(storyType: string) {
    return this.http.get(`${this.storyUrl}${storyType}.json`);
  }

  getStory(storyId: number): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.storyUrl}item/${storyId}.json`)
    };



  //////// Save methods //////////

}
