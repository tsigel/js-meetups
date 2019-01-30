class EventEmitter {
  private events: object;

  constructor() {
    this.events = {};
  }

  public trigger<T>(eventName: string, data: T): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => {
        fn(data);
      });
    }
  }
  
  public on(eventName: string, fn: void) {
    if(!this.events[eventName]) {
      this.events[eventName] = [];
    }
    
    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
  }


}