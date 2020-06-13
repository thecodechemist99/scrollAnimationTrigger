/*
 * Example of an animation event implementation.
 * Distributed under the MIT license.
 * (c) 2020 Florian Beck
*/

let framerate = 30;

let scrollAgent = new ScrollEventAgent();

window.addEventListener("wheel", (e) => {
  scrollAgent.scroll(e.deltaY);
});

scrollAgent.addEvent(1, function (delta) {
  let counter = 0;
  let interval = setInterval(() => {

    if (delta > 0) {
      // do something
    } else {
      // do something
    } 
  
    counter++;

    // set duration/resettime
    if (counter > 25) clearInterval(interval);
  }, (1000 / framerate));
});