import AnimationProcessor from "./animationProcessor.js";
import ScrollEventAgent from "./scrollEventAgent.js"

let framerate = 30;

let scrollAgent = new ScrollEventAgent(framerate);

class Box {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.size = 1;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.rotation));
    scale(this.size);

    this.draw();

    pop();
  }

  draw() {
    rect(0, 0, this.width, this.height);
  }
}

let animate = new AnimationProcessor(framerate);
let box = new Box(width / 2, 0, 80, 80);

animate.addAnimation("fall", box, "y", 0, 400, 2.0, "ease-in-out-expo", 0, 2);
console.log(animate.animations);

function draw() {
    background("#333333");
    noStroke();
    fill("#cccccc");
    box.display();
}
window.draw = draw;

function mouseClicked(){
  animate.start("fall");
}
window.mouseClicked = mouseClicked;

window.addEventListener("wheel", (e) => {
  scrollAgent.scroll(e.deltaY);
});

scrollAgent.addEvent(1, function (delta) {
  animate.start("fall");
});
