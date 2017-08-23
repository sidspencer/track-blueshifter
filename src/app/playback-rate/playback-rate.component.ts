import { Component, OnInit } from '@angular/core';
import { ShifterService } from '../shifter.service';


@Component({
  selector: 'playback-rate',
  templateUrl: './playback-rate.component.html',
  styleUrls: ['./playback-rate.component.css']
})
export class PlaybackRateComponent implements OnInit {
  playbackRate: number = 1.0;

  constructor(private shifterService: ShifterService) {
    this.shifterService.setPlaybackRate(this.playbackRate);
  }

  ngOnInit() {
  }

  rateChange(event) {
    this.shifterService.setPlaybackRate(event.target.value);
  }
}
