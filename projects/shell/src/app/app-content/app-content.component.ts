import { Component, OnInit } from '@angular/core';
import { ReuseStateService } from './../custom-router-reuse-strategy';

@Component({
  selector: 'app-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent {
  config = {
    remoteEntry: 'http://localhost:5200/remoteEntry.js',
    remoteName: 'mfe',
    exposedModule: './rootapp',
    elementName: 'mfe-element'
  };
  show$ = this.reuse.getVisibility$(this);

  constructor(private reuse: ReuseStateService) {}
}

