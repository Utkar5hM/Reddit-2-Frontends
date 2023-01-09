chrome.storage.sync.set({enabled: true});
chrome.storage.sync.set({selectedUrl: "https://libreddit.spike.codes"});
chrome.storage.sync.get("selectedUrl", function (data) {
    redirectingurl = data.selectedUrl;
});

let redirectingurl;

redirector = function (details) {
    chrome.storage.sync.get("enabled", function(items) {
        if (items.enabled) console.log("enabled: hehe");
      });
      console.log(redirectingurl)
  // Check if the extension is enabled
      // Redirect the request if the extension is enabled
    return {redirectUrl: details.url.replace(/^https?:\/\/(www\.)?reddit\.com/, redirectingurl)};
    }

function toggleListener(enable) {
        if (enable) {
            chrome.webRequest.onBeforeRequest.addListener(
                redirector,
                {urls: ["*://*.reddit.com/*"]},
            ["blocking"]
            );
        } else {
            chrome.webRequest.onBeforeRequest.removeListener(redirector);
        }
    }
    
    chrome.storage.onChanged.addListener(function(changes, area) {
        if (area == "sync" && "enabled" in changes) {
            toggleListener(changes.enabled.newValue);
        }
        if (area == "sync" && "selectedUrl" in changes) {
            redirectingurl = changes.selectedUrl.newValue;
        }
    });
    
    chrome.storage.sync.get("enabled", function (data) {
        toggleListener(data.enabled);
    });