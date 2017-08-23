import { TrackBlueshifterPage } from './app.po';

describe('track-blueshifter App', () => {
  let page: TrackBlueshifterPage;

  beforeEach(() => {
    page = new TrackBlueshifterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
