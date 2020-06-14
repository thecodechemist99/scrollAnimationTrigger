/*
 * Example of an animation event implementation.
 * Distributed under the MIT license.
 * (c) 2020 Florian Beck
*/

let framerate = 30;

let scrollAgent = new ScrollEventAgent(framerate);

window.addEventListener("wheel", (e) => {
  scrollAgent.scroll(e.deltaY);
});

scrollAgent.addEvent(1, 1.8, function (delta) {

  if (delta > 0) {
    // do something
  } else {
    // do something
  }

});