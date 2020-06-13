/*
 * Trigger system for animations on specific scroll positions.
 * Distributed under the MIT license.
 * (c) 2020 Florian Beck
*/

export default class ScrollEventAgent {
  constructor() {
    this.events = {};
    this.scrollPos = 0;
  }

  addEvent(trigger, callback){
    if (!(trigger in this.events)) {
      this.events[trigger] = [];
    }
    this.events[trigger].push(callback);
  }

  removeEvent(trigger, callback){
    if (!(trigger in this.events)) {
      return;
    }
    for(let i in this.events[trigger]) {
      if (this.events[trigger][i] === callback) {
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
      elem.call(this, delta);
    }
  }
}