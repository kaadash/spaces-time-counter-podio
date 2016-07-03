// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// renderWorkspaces();
var podio = require('podio-js');

var workspaces = {
  list: [],
  offset: 5
}

function formatTime(time) {
  var second = 1;
  var minute = 60 * second;
  var hour = 60 * minute;
  var formattedTime = '';
  if (time < minute){
    formattedTime = Math.floor(time/second) + 's';
  }
  else if(time >= minute && time < hour) {
    formattedTime = Math.floor(time/minute) + 'm';
  }
  else {
    formattedTime = Math.floor(time/hour) + 'h';
  }
  return formattedTime;
}

// function renderWorkspaces() {
//   var workspacesList = document.getElementById('workspaces-list');
//   chrome.storage.local.get('workspaces', function(data) {
//   workspaces.list = data.workspaces;
//     workspaces.list.sort(function(a, b) {
//       return ((a.time > b.time) ? -1 : 1);  
//     });

//     if(workspaces.list instanceof Array) {
//       workspacesList.innerHTML = '';
//       for (var i = workspaces.offset - 5; i < workspaces.offset; i++) {
//         var listItem = document.createElement('li');
//         var time = document.createElement('strong');
//         var urlText = document.createTextNode(workspaces.list[i].name);
//         var timeText = document.createTextNode(formatTime(workspaces.list[i].time));
        
//         listItem.appendChild(urlText);      
//         time.appendChild(timeText);   
//         listItem.appendChild(time); 
//         workspacesList.appendChild(listItem);  
//       }
//     }
//   });
// }

function login() {
  var client_id = 'tasks-time-counter';
  var redirectUri = chrome.identity.getRedirectURL("oauth2");
  console.log(redirectUri);
  var url = 'https://podio.com/oauth/authorize?response_type=token&client_id='+ client_id + '&redirect_uri=' +redirectUri+'&scope=SCOPE_STRING';
  chrome.identity.launchWebAuthFlow({'url':url,'interactive':true}, function(redirect_url){
          console.log(redirect_url)
      });
}

function getTasks() {
  podio.request('GET', '/org').then(function(responseData) {
     console.log(responseData);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('next-task').addEventListener('click', changeOffset);
  document.getElementById('login').addEventListener('click', login);
  document.getElementById('get-tasks').addEventListener('click', getTasks);
});