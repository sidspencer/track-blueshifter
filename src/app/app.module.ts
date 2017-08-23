import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileChooserComponent } from './file-chooser/file-chooser.component';
import { PlaybackRateComponent } from './playback-rate/playback-rate.component';
import { EqualizerComponent } from './equalizer/equalizer.component';
import { PlaybackButtonsComponent } from './playback-buttons/playback-buttons.component';
import { ExporterComponent } from './exporter/exporter.component';
import { SettingsAreaComponent } from './settings-area/settings-area.component';

import { ShifterService } from './shifter.service';

@NgModule({
  declarations: [
    AppComponent,
    FileChooserComponent,
    PlaybackRateComponent,
    EqualizerComponent,
    PlaybackButtonsComponent,
    ExporterComponent,
    SettingsAreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ShifterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
