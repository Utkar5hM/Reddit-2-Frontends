chrome.tabs.onUpdated.addListener((id, change, tab) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    let url = tabs[0].url;
    if (url.indexOf('www.reddit.com') != -1) {
      finalPath = differenceBetweenUrls('https://www.reddit.com/', url);
      chrome.tabs.update({
        url: 'https://' + 'libreddit.spike.codes/' + finalPath,
      });
    } else if (url.indexOf('reddit.com') != -1) {
      finalPath = differenceBetweenUrls('https://reddit.com/', url);
      chrome.tabs.update({
        url: 'https://' + 'libreddit.spike.codes/' + finalPath,
      });
    }
  });
});

function differenceBetweenUrls(defaultUrl, currentUrl) {
  string_b = currentUrl;
  string_a = defaultUrl;
  first_occurance = string_b.indexOf(string_a);
  if (first_occurance == -1) {
    alert('Search string Not found');
  } else {
    string_a_length = string_a.length;
    if (first_occurance == 0) {
      new_string = string_b.substring(string_a_length);
    } else {
      new_string = string_b.substring(0, first_occurance);
      new_string += string_b.substring(first_occurance + string_a_length);
    }
    return new_string;
  }
}
