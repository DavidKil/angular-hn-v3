import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Story } from './story';
import { StoriesService } from './stories.service';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  providers: [StoriesService],
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: Array<Story> = [];
  storyIds: Array<number>
  tailIndex: number = 0;
  pageLimit: number = 10;
  isLoading: boolean = false

  constructor(private storiesService: StoriesService) {}

  ngOnInit() {

  }

  toggleStoryType(storyType: string) {
    this.reset();
    this.isLoading = true;
    this.storiesService.getStoryIds(storyType)
      .subscribe((stories: Array<number>) => {
        this.isLoading = true;
        this.tailIndex = 0;
        this.storyIds = stories;
        this.loadStories();
      })
  }

  reset() {
    this.stories = [];
    this.tailIndex = 0;
    this.pageLimit = 10;
  }


  loadStories() {
    if (!this.storyIds || !(this.pageLimit < this.storyIds.length + 10)) {
      return;
    }
    const storiesList = [];
    this.isLoading = true;
    for (let i = this.tailIndex; i < this.pageLimit; i++) {
      storiesList.push(
        this.storiesService.getStory(this.storyIds[i])
      );
    }
    forkJoin(storiesList).subscribe(
      (moreStories: Array<Story>) => {
        moreStories.forEach(function(story){
          story.domain = this.getDomainForUrl(story.url);
        }, this);
        this.stories = [...this.stories, ...moreStories];
        this.isLoading = false;
        this.tailIndex = this.pageLimit;
        this.pageLimit = this.pageLimit + 5;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  
  openLink(url: string) {
    if (url) {
      window.open(url);
    }
  }

  getDomainForUrl(url: string) {
    if (!url) return ""
    let domain = (new URL(url));
    return domain.hostname;
  }

}
