class Slider {
  private node: HTMLElement;
  private left: HTMLElement;
  private right: HTMLElement;
  private slideList: Array<HTMLElement>;
  private handlers: Array<{ element: HTMLElement; cb: () => void }> = [];
  private target: HTMLElement;
  private activeIndex = 0;
  private inProgres: boolean = false;

  constructor(
    node: HTMLElement,
    left: HTMLElement,
    right: HTMLElement,
    target: HTMLElement,
    slideContainer: HTMLElement
  ) {
    this.node = node;
    this.left = left;
    this.right = right;
    this.target = target;
    this.slideList = Array.prototype.slice
      .call(slideContainer.childNodes)
      .filter(node => node.nodeType === 1);

    this.init();
  }

  public destroy() {
    this.handlers.forEach(({ element, cb }) => {
      element.removeEventListener("click", cb, false);
    });
    this.handlers = [];
  }

  private init() {
    this.setHandlers();
    this.setFirstSlide();
  }

  private setFirstSlide() {
    this.target.appendChild(this.slideList[this.activeIndex]);
  }

  private setHandlers() {
    this.handlers.push({
      element: this.left,
      cb: () => this.move("left")
    });
    this.handlers.push({
      element: this.right,
      cb: () => this.move("right")
    });
    this.left.addEventListener("click", this.handlers[0].cb, false);
    this.right.addEventListener("click", this.handlers[1].cb, false);
  }

  private move(type: "left" | "right") {
    if (this.inProgres) {
      return null;
    }
    const newIndex = Math.min(
      Math.max(
        0,
        type === "left" ? this.activeIndex - 1 : this.activeIndex + 1
      ),
      this.slideList.length - 1
    );

    if (newIndex === this.activeIndex) {
      return null;
    }

    this.fadeMove(newIndex);
  }

  private fadeMove(newIndex: number) {
    this.inProgres = true;
    const active = this.slideList[this.activeIndex];
    const next = this.slideList[newIndex];

    const animateFunctionHide = progress => {
      active.style.opacity = String(1 - progress);
    };
    const animateFunctionShow = progress => {
      next.style.opacity = String(progress);
    };

    animate(300, animateFunctionHide).then(() => {
      this.target.removeChild(active);
      this.target.appendChild(next);
      animate(300, animateFunctionShow).then(() => {
        this.activeIndex = newIndex;
        this.inProgres = false;
      });
    });
  }
}

const animate = (
  duration: number,
  cb: (progress: number) => void
): Promise<void> => {
  return new Promise(resolve => {
    const start = Date.now();

    const loop = () => {
      const delta = Date.now() - start;
      const progress = Math.min(delta / duration, 1);
      cb(progress);

      if (progress === 1) {
        resolve();
      } else {
        requestAnimationFrame(loop);
      }
    };
    loop();
  });
};

// const Vasia = {
//   name: "Vasia",
//   age: 28
// };

// let age = Vasia.age;
// Object.defineProperty(Vasia, "age", {
//   set: v => {
//     console.log("New age for Vasia");
//     if (v < 25) throw new Error("My error");
//     age = v;
//   },
//   get: () => age
// });

// Vasia.age = 15;
