class EventEmitter {
  private events: object;

  constructor() {
    this.events = {};
  }

  public trigger<T>(eventName: string, data: T): void {
    if (this.events.hasOwnProperty(eventName)) {
      this.events[eventName].forEach(fn => {
        fn(data);
      });
    }
  }
  
  public on(eventName: string, fn: void) {
    if(!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }
    
    this.events[eventName].push(fn);
  }

  public off(eventName: string, handler: () => void): void {
    if (eventName && handler) {
      this.events = this.events[eventName].filter(fn => handler !== fn);
    } else if (eventName && !handler) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }


}