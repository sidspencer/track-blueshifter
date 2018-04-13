import { Component, OnInit } from '@angular/core';

import { ShifterService } from './../shifter.service';

@Component({
  selector: 'equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.css']
})
export class EqualizerComponent implements OnInit {
  lowGain: number = 0.0;
  midGain: number = 0.0;
  highGain: number = 0.0;

  lowGainNode: GainNode = null;
  midGainNode: GainNode = null;
  highGainNode: GainNode = null;

  context: AudioContext;

  constructor(private shifterService: ShifterService) { }

  ngOnInit() {
    this.setGainNodes();
  }

  private setGainNodes() {
    return this.shifterService.getAudioContext().then(
      (audioContext: AudioContext) => {
        if (audioContext == null) {
          return;
        }

        this.context = audioContext;
        var sourceNode = this.context.createGain();

        // EQ Properties
        //
        var bandSplit = [360,3600];

        var hBand = this.context.createBiquadFilter();
        hBand.type = "lowshelf";
        hBand.frequency.value = bandSplit[0];
        hBand.gain.value = this.highGain;

        var hInvert = this.context.createGain();
        hInvert.gain.value = -1.0;

        var mBand = this.context.createGain();

        var lBand = this.context.createBiquadFilter();
        lBand.type = "highshelf";
        lBand.frequency.value = bandSplit[1];
        lBand.gain.value = this.highGain;

        var lInvert = this.context.createGain();
        lInvert.gain.value = -1.0;

        sourceNode.connect(lBand);
        sourceNode.connect(mBand);
        sourceNode.connect(hBand);

        hBand.connect(hInvert);
        lBand.connect(lInvert);

        hInvert.connect(mBand);
        lInvert.connect(mBand);

        this.lowGainNode = this.context.createGain();
        this.midGainNode = this.context.createGain();
        this.highGainNode = this.context.createGain();

        lBand.connect(this.lowGainNode);
        mBand.connect(this.midGainNode);
        hBand.connect(this.highGainNode);

        var sum = this.context.createGain();
        this.lowGainNode.connect(sum);
        this.midGainNode.connect(sum);
        this.highGainNode.connect(sum);
        sum.connect(this.context.destination);
      },
      (error: Error) => {
        console.log(JSON.stringify(error));
      }
    );


  }

  setLowGain() {
    this.setGainNodes().then(() => {
      this.lowGainNode.gain.value = this.lowGain;
    });
  }

  setMidGain() {
    this.setGainNodes().then(() => {
      this.midGainNode.gain.value = this.midGain;
    });
  }

  setHighGain() {
    this.setGainNodes().then(() => {
      this.highGainNode.gain.value = this.highGain;
    });
  }
}