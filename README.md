# scrollAnimationTrigger

A trigger system to trigger JavaScript animations on specific scroll positions.

# How to use

## Setup

Put animationProcessor.js and scrollEventAgent.js in the source path of your site and create an instance of both classes in your javascript file:

```javascript
let framerate = 30;
let animate = new AnimationProcessor(framerate);
let scrollAgent = new ScrollEventAgent(framerate);
```

To trigger scroll events, you have to add an eventListener to your file:

```javascript
window.addEventListener("wheel", (e) => {
  scrollAgent.scroll(e.deltaY);
});
```

## Add Animations



## Add Events

Now you can add as many events to the trigger system as you want. Simply add them via the `.addEvent` method:

```javascript
scrollAgent.addEvent(1, function (delta) {
  // do something ...
}, 1.2);
```

or

```javascript
function myFunction(delta) {
  // do something ...
}

scrollAgent.addEvent(1, 1.8, myFunction, 1.2);
```

where the parameters are the trigger point (the scroll position of your site in overall scroll steps where your animation shall be triggered), the duration in seconds and the callback function/animation you want to execute when the event is triggered. The last parameter is an optional delay, also in seconds.
The callback function will recieve `delta` as a parameter, which indicates the scroll direction by a positive or negative number.

## Remove Events

To remove an event, use the `.removeEvent` method with the parameters `trigger` and `callback`:

```javascript
scrollAgent.removeEvent(1, myFunction);
```

# Upcoming

In a future update I would like to add easing functionality (ease-in, ease-out, ease-in-out).