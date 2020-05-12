/*!
  * funtabify v1.0 
  * Author: pagalprogrammer (https://pagalprogrammer.dev)
  * Licensed under GNU GPLv3 (https://github.com/pagalprogrammer/funtabify/blob/master/LICENSE)
  * Credits: Alex Gurevich (https://fabriceleven.com/dev/changing-tab-title-focus-loss/)
  *
*/
 
class funtabify {
	constructor(switchTitle) {
		jQuery(document).ready(function($) {

		(function() {
				var hidden = "hidden";
				var oldtitle = document.title;
				var currenttitle;

				// Standards based on browsers:
				if (hidden in document)
					document.addEventListener("visibilitychange", onchange);
				else if ((hidden = "mozHidden") in document) // For Mozilla Firefox
					document.addEventListener("mozvisibilitychange", onchange);
				else if ((hidden = "webkitHidden") in document) // For Chrome, Safari etc.
					document.addEventListener("webkitvisibilitychange", onchange);
				else if ((hidden = "msHidden") in document)
					document.addEventListener("msvisibilitychange", onchange);
				// IE 9 and lower:
				else if ("onfocusin" in document)
					document.onfocusin = document.onfocusout = onchange;
				// All others:
				else
					window.onpageshow = window.onpagehide
						= window.onfocus = window.onblur = onchange;

			   //if tab change happens set status to either hidden or visible
				function onchange (evt) {
					var v = "visible", h = "hidden",
						evtMap = {   //check events and set status based on event type
							focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
						};

					evt = evt || window.event;
					if (evt.type in evtMap) {  // check the title
						currenttitle = oldtitle;
						$(document).attr('title', currenttitle);
					}
					else { // We are in hidden state so create unique title
						currenttitle = this[hidden] ? switchTitle : oldtitle; //update to whatever you want
						$(document).attr('title', currenttitle);
					}

				}

				// set the initial state (but only if browser supports the Page Visibility API)
				if( document[hidden] !== undefined )
					onchange({type: document[hidden] ? "blur" : "focus"});
			})();
		});
  }
}