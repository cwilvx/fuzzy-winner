const TUBE_SIZE = 4;
const CLASS_SIZE = 4;
const YEARLY_HOURS = 15 * 5 * 4 * 9;

function rand(): number {
  return Math.floor(Math.random() * 101) + 100;
}

class FluorescentTube {
  hoursToFailure: number;

  constructor() {
    this.hoursToFailure = rand();
  }
}

class TubeUnit {
  tubes: FluorescentTube[] = [];
  tubesReplaced: number = 0;

  constructor() {
    for (let i = 0; i < TUBE_SIZE; i++) {
      this.tubes.push(new FluorescentTube());
    }
  }

  run(hours: number) {
    while (hours > 0) {
      this.tubes.sort((a, b) => a.hoursToFailure - b.hoursToFailure);
      const index2 = this.tubes[1];

      hours -= index2.hoursToFailure;
      this.tubesReplaced += TUBE_SIZE;
    }
  }
}

class Classroom {
  units: TubeUnit[] = [];

  constructor() {
    for (let i = 0; i < CLASS_SIZE; i++) {
      this.units.push(new TubeUnit());
    }
  }

  run(hours: number) {
    for (let unit of this.units) {
      unit.run(hours);
    }
  }

  getTotalTubesReplaced(): number {
    return this.units.reduce((total, unit) => total + unit.tubesReplaced, 0);
  }
}

let classroom = new Classroom();
classroom.run(YEARLY_HOURS);
let tubesReplaced = classroom.getTotalTubesReplaced();

console.log(`Tubes replaced in a year: ${tubesReplaced}`);
console.log(`Cost per year: $${tubesReplaced * 7}`);
