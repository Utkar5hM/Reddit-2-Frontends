// Set the initial state of the toggle button
chrome.storage.sync.get("enabled", function(items) {
    document.getElementById("toggle").checked = items.enabled;
    document.getElementById("status").innerText = items.enabled ? "Enabled" : "Disabled";
  });
  
  // Set the initial state of the dropdown list and custom URL input
  chrome.storage.sync.get(["selectedUrl", "customSelected"], function(items) {
    let selectedUrl = items.selectedUrl;
    let customSelected = items.customSelected;
    if (customSelected) {
      document.getElementById("url-select").value = "custom";
      document.getElementById("custom-url-group").style.display = "block";
      document.getElementById("custom-url").value = selectedUrl;
    } else if (selectedUrl) {
      document.getElementById("url-select").value = selectedUrl;
    }
  });
  
  // Update the toggle button
// Update the toggle button and the text label when the state changes
document.getElementById("toggle").onchange = function() {
    chrome.storage.sync.set({enabled: this.checked});
    document.getElementById("status").innerText = this.checked ? "Enabled" : "Disabled";
  };
  
  // Update the selected URL and customSelected variables in sync storage when the dropdown list changes
  document.getElementById("url-select").onchange = function() {
    let selectedOption = this.value;
    if (selectedOption === "custom") {
      document.getElementById("custom-url-group").style.display = "block";
      chrome.storage.sync.set({customSelected: true});
    } else {
      document.getElementById("custom-url-group").style.display = "none";
      // Store the selected URL in sync storage
      chrome.storage.sync.set({selectedUrl: selectedOption, customSelected: false});
    }
  };
  
  // Update the selected URL in sync storage when the custom URL input changes
  document.getElementById("custom-url").onchange = function() {
    let customUrl = this.value;
    // Store the custom URL in sync storage
    chrome.storage.sync.set({selectedUrl: customUrl});
  };