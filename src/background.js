chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        "id": "track-blueshifter",
        "innerBounds": {
            "minWidth": 600,
            "minHeight": 600
        }
    });
});
