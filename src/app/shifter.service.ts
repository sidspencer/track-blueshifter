import { Injectable } from '@angular/core';

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

  constructor() { }

  public setTrackFile(file: File) {
    this.trackFile = file;
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
  }

  public playTrack() {
    var audioContext = new (AudioContext || webkitAudioContext)();
    
    // Connect the buffer source for playing, and the stream destination for saving.
    this.bufferSource = audioContext.createBufferSource();
    this.bufferSource.connect(audioContext.destination);

    var output = audioContext.createMediaStreamDestination();
    var outputChunks = [];

    this.recorder = new Recorder(this.bufferSource, { "workerPath": "lib/Recorderjs-master/recorderWorker.js" });

    // Read the uploaded audio file, play it when loaded.
    var reader = new FileReader();

    reader.onload = (ev: any) => {
        audioContext.decodeAudioData(ev.target.result, (buffer: AudioBuffer) => {
            this.bufferSource.buffer = buffer;

            // This is the nightcoring.
            this.bufferSource.playbackRate.value = this.playbackRate;
                
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
        },
        "audio/mp3"
    );
  }
}
