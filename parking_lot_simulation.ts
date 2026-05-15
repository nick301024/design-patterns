import { ParkingLot } from "./parking_lot.ts";

const maxFillIntervalMillis = 1000;
const maxEmptyIntervalMillis = 2000;
const initialFillPhaseMillis = 5000;
const refreshDisplayIntervalMillis = 250;

const sleep = (millis: number) => new Promise((r) => setTimeout(r, millis));

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1));

const fill = async (lot: ParkingLot) => {
  while (!lot.isFull()) {
    await sleep(rand(0, maxFillIntervalMillis));
    lot.enter();
    console.log(`a car entered the lot ${lot.name}`);
  }
};

const empty = async (lot: ParkingLot) => {
  while (!lot.isEmpty()) {
    await sleep(rand(0, maxEmptyIntervalMillis));
    lot.exit();
    console.log(`a car left the lot ${lot.name}`);
  }
};

const display = async (lot: ParkingLot) => {
  while (true) {
    console.log(`${lot.name}: ${lot.occupied}/${lot.capacity} occupied`);
    await sleep(refreshDisplayIntervalMillis);
  }
};
const lot = new ParkingLot("Bahnhof Parking", 100);
const display = new Display();

lot.subscribe(display); 

const bahnhofParking = new ParkingLot("Bahnhof Parking", 100);
const screen = display(bahnhofParking);
const filler = fill(bahnhofParking);
await sleep(initialFillPhaseMillis);
const emptier = empty(bahnhofParking);
await screen;
await filler;
await emptier;
