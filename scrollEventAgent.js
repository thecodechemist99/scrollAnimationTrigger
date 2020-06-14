/*
 * Trigger system for animations on specific scroll positions.
 * Distributed under the MIT license.
 * (c) 2020 Florian Beck
*/

export default class ScrollEventAgent {
  constructor(framerate) {
    this.events = {};
    this.scrollPos = 0;
    this.framerate = framerate;
  }

  addEvent(trigger, duration, callback, delay = 0){
    if (!(trigger in this.events)) {
      this.events[trigger] = [];
    }
    this.events[trigger].push({
        duration: duration,
        animation: callback,
        delay: delay,
      });
  }

  removeEvent(trigger, callback){
    if (!(trigger in this.events)) {
      return;
    }
    for(let i in this.events[trigger]) {
      if (this.events[trigger][i].animation === callback) {
        this.events[trigger].splice(i, 1);
        return;
      }
    }
  }

  scroll(delta) {
    if (delta > 0) {
      this.scrollPos++;
    } else if (this.scrollPos > 0) {
      this.scrollPos--;
    }
    
    if (!(this.scrollPos in this.events)) {
      return;
    }

    for(let elem of this.events[this.scrollPos]) {
      let counter = 0;
      setTimeout(() => {
        let interval = setInterval(() => {
        
          elem.animation.call(this, delta);
          counter++;
  
          if (counter > (elem.duration * this.framerate)) clearInterval(interval);
        }, (1000 / this.framerate));
      }, elem.delay * 1000);
    }
  }
}