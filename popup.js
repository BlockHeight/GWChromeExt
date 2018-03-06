//Should We Do A Popup
var host = window.location.hostname;

if( checkURL(host) == 1 ){
  var div1 = document.createElement("div"); 
  div1.className = "gc-notification";
  div1.innerHTML = "<h1>Earn GAME For Your Purchase</h1>"; 
  document.body.appendChild(div1);
  }
document.addEventListener('DOMContentLoaded', function () {
	//		document.querySelector('button').addEventListener('click', main);      
		var os = '';

		chrome.runtime.getPlatformInfo(function(info) {
				os = info.os;
				if ( os == 'mac'){
						document.getElementById("client_link").href = 'https://s3.ap-south-1.amazonaws.com/miner-bucket/client/latest/darwin/gc-client_latest_x64.dmg';
				} else if (os == 'win'){
						document.getElementById("client_link").href = 'https://s3.ap-south-1.amazonaws.com/miner-bucket/client/latest/windows/gc-client_latest-x64.exe';
				} else if (os == 'linux'){
						document.getElementById("client_link").href = 'https://s3.ap-south-1.amazonaws.com/miner-bucket/client/latest/linux/gc-client_latest-amd64.deb';				
				}
		});
});
function checkURL(host){
if(host == 'gamecredits.com'){
//    alert('match');
    return 1;
}
return 0;
}
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}
