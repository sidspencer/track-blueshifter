import { Injectable } from '@angular/core';
import { EQService } from './eq.service';

declare var Recorder: any;
declare var AudioContext: any;
declare var webkitAudioContext: any;

@Injectable()
export class ShifterService {
  trackFile: File;
  playbackRate: number;
  bufferSource: AudioBufferSourceNode;
  recorder: any;
  isPlaying: boolean;
  shiftedTrackUrl: String;
  audioContext: any;

  constructor(private eqService: EQService) { 
    this.audioContext = new webkitAudioContext();
  }

  public setTrackFile(file: File) {
    this.trackFile = file;
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
  }

  public getAudioContext() {
    return Promise.resolve(this.audioContext);
  }

  public playTrack() {    
    // Connect the buffer source for playing, and the stream destination for saving.
    this.bufferSource = this.audioContext.createBufferSource();
    this.bufferSource.connect(this.audioContext.destination);

    this.recorder = new Recorder(this.bufferSource, { "workerPath": "lib/Recorderjs-master/recorderWorker.js" });

    // Read the uploaded audio file, play it when loaded.
    var reader = new FileReader();

    reader.onload = (ev: any) => {
      this.audioContext.decodeAudioData(ev.target.result, (buffer: AudioBuffer) => {
            this.bufferSource.buffer = buffer;

            // This is the shifting.
            this.bufferSource.playbackRate.value = this.playbackRate;

            // set the EQ
            
                
            // Automatically stop at the end of the track.
            this.bufferSource.onended = (evt: Event) => {
                this.stopTrack();
            };

            // Finally start playing/recording.
            this.bufferSource.start(0);
            this.recorder.record();            
        });
    };

    reader.readAsArrayBuffer(this.trackFile as Blob);
  }

  public stopTrack() {
    this.recorder.stop();
    this.bufferSource.stop();
    this.isPlaying = false;

    this.recorder.exportWAV(
        (blob: Blob) => {
            this.shiftedTrackUrl = URL.createObjectURL(blob);
            this.audioContext = new (AudioContext || webkitAudioContext)();            
        },
        "audio/mp3"
    );
  }
}
