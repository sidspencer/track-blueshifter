import { Component, OnInit } from '@angular/core';
import { ShifterService } from '../shifter.service';

@Component({
  selector: 'playback-buttons',
  templateUrl: './playback-buttons.component.html',
  styleUrls: ['./playback-buttons.component.css']
})
export class PlaybackButtonsComponent implements OnInit {

  constructor(private shifterService: ShifterService) { }

  ngOnInit() {
  }

  play(event) {
    this.shifterService.playTrack();
  }

  stop(event) {
    this.shifterService.stopTrack();
  }
}
