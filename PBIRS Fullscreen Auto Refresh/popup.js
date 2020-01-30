// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function click(e) {
	
	
	chrome.tabs.executeScript(null,
		{code:"var element = document.querySelector('html#portal');if(typeof(element) != 'undefined' && element != null){console.log('Executing...');}else{alert('Be sure current tab contains a Power BI report on PBIRS!');}"});
	
	var refreshinterval = "10";
	var makefullscreen = document.getElementsByName("fullscreen")[0].checked;
	var hidetopbar = document.getElementsByName("hidebars")[0].checked;

	var radios = document.getElementsByName('duration');
	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			console.log(radios[i].value);
			refreshinterval = radios[i].value;
			break;
		}
	}
	if(hidetopbar){
		chrome.tabs.executeScript(null,
		{code:"setTimeout(function(){document.querySelector('.navbar-fixed-top').style.display = 'none'; document.querySelector('.toolbar').style.display = 'none';document.querySelector('.breadcrumbs').style.display = 'none';document.querySelector('section#main').setAttribute('style','margin-top:-37px!important');}, 1000);"});
	} else {
		chrome.tabs.executeScript(null,
		{code:"setTimeout(function(){document.querySelector('.navbar-fixed-top').style.display = 'block'; document.querySelector('.toolbar').style.display = 'block';document.querySelector('.breadcrumbs').style.display = 'block';document.querySelector('section#main').setAttribute('style','margin-top:37px!important');}, 1000);"});
	}
	if(makefullscreen){
		chrome.tabs.executeScript(null,
		{code:"setTimeout(function(){document.documentElement.requestFullscreen();}, 1000);"});
	}
	if(refreshinterval=="0"){
		chrome.tabs.executeScript(null,
		{code:"clearInterval(myinterval);"});
	} else {
		chrome.tabs.executeScript(null,
		{code:"function pbirefresh() {document.querySelector('li.nav-pbi-refresh > a').click();}pbirefresh();clearInterval(myinterval);var myinterval = setInterval(pbirefresh, " + refreshinterval + "*1000);"});
		//e.target.id
	}
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});






