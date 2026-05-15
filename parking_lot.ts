export class ParkingLot {
  public occupied: number = 0;

  constructor(
    public name: string,
    public capacity: number,
  ) {}

  enter() {
    if (!this.isFull()) {
      this.occupied++;
    } else {
      throw new Error(`the parking lot is full`);
    }
  }

  exit() {
    if (!this.isEmpty()) {
      this.occupied--;
    } else {
      throw new Error(`the parking lot is empty`);
    }
  }

  isFull() {
    return this.occupied == this.capacity;
  }

  isEmpty() {
    return this.occupied == 0;
  }
}

export interface ParkingEvent {
  action: "entered" | "left";
  lotName: string;
  occupied: number;
  capacity: number;
}

export interface Subscriber {
  update(event: ParkingEvent): void;
}

export interface Publisher {
  subscribe(s: Subscriber): void;
  unsubscribe(s: Subscriber): void;
  notify(e: ParkingEvent): void;
}

export class ParkingLot implements Publisher {
  private subscribers: Subscriber[] = [];
  constructor(public name: string, public capacity: number, public occupied: number = 0) {}

  subscribe(s: Subscriber) { this.subscribers.push(s); }
  unsubscribe(s: Subscriber) { this.subscribers = this.subscribers.filter(sub => sub !== s); }
  notify(e: ParkingEvent) { this.subscribers.forEach(s => s.update(e)); }

  enter() {
    if (this.occupied < this.capacity) {
      this.occupied++;
      this.notify({ action: "entered", lotName: this.name, occupied: this.occupied, capacity: this.capacity });
    }
  }

  exit() {
    if (this.occupied > 0) {
      this.occupied--;
      this.notify({ action: "left", lotName: this.name, occupied: this.occupied, capacity: this.capacity });
    }
  }
}

export class Display implements Subscriber {
  update(e: ParkingEvent) {
    console.log(`A car ${e.action} the lot ${e.lotName}: ${e.occupied}/${e.capacity} occupied.`);
  }
}