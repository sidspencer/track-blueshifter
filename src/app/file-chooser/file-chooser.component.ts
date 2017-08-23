import { Component, OnInit } from '@angular/core';
import { ShifterService } from '../shifter.service';

@Component({
  selector: 'file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.css']
})
export class FileChooserComponent implements OnInit {
  track: string = '';

  constructor(private shifterService: ShifterService) { }

  ngOnInit() {
  }

  uploadTrack(e) {
    this.shifterService.setTrackFile(e.target.files[0]);
  }
}
