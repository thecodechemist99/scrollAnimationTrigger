/*
 * Animation processor for javascript animations.
 * Distributed under the MIT license.
 * (c) 2020 Florian Beck
*/

export default class AnimationProcessor {
  constructor(framerate) {
    this.fps = framerate;

    this.animations = {};

    this.easings = {
      "linear": this.easeLinear,
      "ease-in-sine": this.easeInSine,
      "ease-out-sine": this.easeOutSine,
      "ease-in-out-sine": this.easeInOutSine,
      "ease-in-quad": this.easeInQuad,
      "ease-out-quad": this.easeOutQuad,
      "ease-in-out-quad": this.easeInOutQuad,
      "ease-in-cubic": this.easeInCubic,
      "ease-out-cubic": this.easeOutCubic,
      "ease-in-out-cubic": this.easeInOutCubic,
      "ease-in-quart": this.easeInQuart,
      "ease-out-quart": this.easeOutQuart,
      "ease-in-out-quart": this.easeInOutQuart,
      "ease-in-quint": this.easeInQuint,
      "ease-out-quint": this.easeOutQuint,
      "ease-in-out-quint": this.easeInOutQuint,
      "ease-in-expo": this.easeInExpo,
      "ease-out-expo": this.easeOutExpo,
      "ease-in-out-expo": this.easeInOutExpo,
      "ease-in-circ": this.easeInCirc,
      "ease-out-circ": this.easeOutCirc,
      "ease-in-out-circ": this.easeInOutCirc,
      "ease-in-back": this.easeInBack,
      "ease-out-back": this.easeOutBack,
      "ease-in-out-back": this.easeInOutBack,
      "ease-in-elastic": this.easeInElastic,
      "ease-out-elastic": this.easeOutElastic,
      "ease-in-out-elastic": this.easeInOutElastic,
      "ease-in-bounce": this.easeInBounce,
      "ease-out-bounce": this.easeOutBounce,
      "ease-in-out-bounce": this.easeInOutBounce
    };
  }

  addAnimation(name, target, param, startValue, endValue, duration, easing = "linear", delay = 0, repeat = 0) {
    if (name in this.animations) {
      return false;
    }
    this.animations[name] = {
      name: name,
      target: target,
      param: param,
      startValue: startValue,
      endValue: endValue,
      duration: duration,
      easing: easing,
      delay: delay,
      repeat: repeat
    }
  }

  removeAnimation(name) {
    if (!(name in this.animations)) {
      return false;
    }
    delete this.animations[name];
  }

  // addAnimationChain(name, ...args) {
  //   if (name in this.animations) {
  //     return false;
  //   }
  //   this.animations[name] = () => {
  //     this.chainAnimations( ...args);
  //   };
  // }

  // chainAnimations(name, ...args) {
  //   if (!(name in this.animations) || args.length < 2) {
  //     return false;
  //   }
  //   for (let elem of args) {
  //     if (!(elem in this.animations)) {
  //       continue;
  //     }
  //     this.animations[elem].call();
  //   }
  // }

  start(name, reversed = false, callback = undefined) {
    if (!(name in this.animations)) {
      return false;
    }
    let a = this.animations[name];
    if (!reversed) {
      this.animate(a.target, a.param, a.startValue, a.endValue, a.duration, a.easing, a.delay, a.repeat, callback);
    } else {
      this.animate(a.target, a.param, a.endValue, a.startValue, a.duration, a.easing, a.delay, a.repeat, callback);
    }

  }

  animate(target, param, startValue, endValue, duration, easing = "linear", delay = 0, repeat = 0, callback = undefined) {
    let delta = endValue - startValue;
    let counter = 0;
    let progress = 0;

    setTimeout(() => {
      let interval = setInterval(() => {
        // adjust value
        target[param] = startValue + delta * this.easings[easing].call(this, progress);

        // control animation
        counter++;
        progress = counter / (duration * this.fps);

        // stop animation
        if (counter >= duration * this.fps) {
          clearInterval(interval);
          // repeat
          repeat--;
          if (repeat > 0) {
            this.animate(target, param, startValue, endValue, duration, easing, delay, repeat);
          } else if (callback != undefined) {
            callback();
          }
        }
      }, 1000 / this.fps);
    }, delay * 1000);
  }

  easeLinear(x) {
    return x;
  }

  easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }

  easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
  }

  easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }

  easeInQuad(x) {
    return Math.pow(x, 2);
  }

  easeOutQuad(x) {
    return 1 - Math.pow((1 - x), 2);
  }

  easeInOutQuad(x) {
    return x < 0.5 ? 2 * Math.pow(x, 2) : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  easeInCubic(x) {
    return Math.pow(x, 3);
  }

  easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  easeInOutCubic(x) {
    return x < 0.5 ? 4 * Math.pow(x, 3) : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  easeInQuart(x) {
    return Math.pow(x, 4);
  }

  easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  easeInOutQuart(x) {
    return x < 0.5 ? 8 * Math.pow(x, 4) : 1 - Math.pow(-2 * x + 2, 4) / 2;
  }

  easeInQuint(x) {
    return Math.pow(x, 5);
  }

  easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }

  easeInOutQuint(x) {
    return x < 0.5 ? 16 * Math.pow(x, 5) : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  easeInExpo(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  }

  easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  easeInOutExpo(x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
  }

  easeInCirc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }

  easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  easeInOutCirc(x) {
    return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }

  easeInBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return c3 * x * x * x - c1 * x * x;
  }

  easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    
    return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }

  easeInElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }

  easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }

  easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;

    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
     : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  }

  easeInBounce(x) {
    return 1 - this.easeOutBounce(1 - x);
  }

  easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
        return n1 * Math.pow(x, 2);
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }

  easeInOutBounce(x) {
    return x < 0.5 ? (1 - this.easeOutBounce(1 - 2 * x)) / 2 : (1 + this.easeOutBounce(2 * x - 1)) / 2;
  }
}