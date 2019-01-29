class AnimationSingleton {
  protected static instance: AnimationSingleton;

  public static get Instance(): AnimationSingleton {
    return this.instance || new this();
  }

  public animate(
    duration: number,
    cb: (progress: number) => void,
    endCb: () => void
  ): Promise<void> | void {

    const animation = (callback) => {
      const start = performance.now();
      const loop = (time : number) => {
        const delta = time - start;
        const progress = Math.min(delta / duration, 1);
        cb(progress);

        if (progress === 1) {
          callback();
        } else {
          requestAnimationFrame(loop);
        }
      };
      requestAnimationFrame(loop);
    }
    if (endCb) {
      return animation(endCb);
    }
    return new Promise(animation);
    }
};