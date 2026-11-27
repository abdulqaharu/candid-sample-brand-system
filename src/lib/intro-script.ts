/** Set on <html> while the first-visit intro is showing. */
export const INTRO_CLASS = "candid-intro";
export const INTRO_KEY = "candid-intro-seen";
/** Fired on window once the intro has handed over to the page. */
export const INTRO_DONE = "candid:intro-done";

/**
 * Runs in <head>, before first paint, so return visitors never see the intro.
 * It plays on a first visit to the Introduction, or whenever ?intro=1 asks for
 * it. If storage cannot be read, there is no intro.
 */
export const introScript = `(function(){if(location.pathname!=="/")return;var play=new URLSearchParams(location.search).get("intro")==="1";if(!play){try{play=!localStorage.getItem("${INTRO_KEY}")}catch(e){play=false}}if(play){document.documentElement.classList.add("${INTRO_CLASS}");try{history.scrollRestoration="manual"}catch(e){}}})()`;
