/*
  PROBLEM STATEMENT:

  In a University, there is a classroom, in that classroom, there are 4 fluorescent tube units, each unit contains 4 fluorescent tubes.
  The classroom is used 15 hours a day, 5 times a week, 9 months a year.
  Every fluorescent tube works for a fixed amount of hours, that amount is returned by a function called "rand()" that returns an integer number from 100 to 200 that represents the number of hours that the fluorescent tube will work before breaking.
  Once 2 fluorescent tubes fail in a single unit, you should replace all 4 tubes.
  Each fluorescent tube costs 7 $USD.

  The algorithm should print:
  - How many fluorescent tubes were broken in 1 year in that classroom?
  - How much money do fluorescent tubes cost the University per year per classroom?

  ===============
  == SOLUTION: ==
  ===============

  ASSUMPTIONS:
  1. There are 4 weeks in a month
  2. The initial cost of the tubes is not considered
  3. When a unit has 2 tubes broken, all 4 tubes are considered broken
  4. The cost of running the classroom is determined by running the simulation only once.

  APPROACH:

  Given that the classroom will run for N hours, it means that each unit will run for N hours.
  We can then run each unit for N hours and count how many tubes were replaced. We can get how
  many tubes were replaced in a single* unit using the following algorithm:

  createUnitWithInitialTubes()
  tubesReplaced = 0

  runUnitForHours(N){
    while (N > 0) {
      sortTubesByHoursToFailure()
      takeSecondTube()
      N -= secondTube.hoursToFailure
      tubesReplaced += 4
      replaceTubes()
    }

    return tubesReplaced
  }

  Running this algorithm for each unit and adding all replacedUnits, will give us the total tubes replaced in a year.

  The code below uses classes to represent the entities in the problem, and uses the algorithm described above to solve the problem.
*/

const TUBES_IN_UNIT = 4;
const UNITS_IN_CLASS = 4;

// 15 hours a day, 5 times a week, 4 weeks a month, 9 months a year
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
    this.changeTubes();
  }

  changeTubes() {
    // Remove all tubes and create new ones
    this.tubes = [];
    for (let i = 0; i < TUBES_IN_UNIT; i++) {
      this.tubes.push(new FluorescentTube());
    }
  }

  run(hours: number) {
    while (hours > 0) {
      // Sort tubes by hours to failure, the first 2 will be the ones that fail first
      // Take the timeToFailure of the second tube and subtract it from the total hours
      // Then, replace all tubes in the unit

      this.tubes.sort((a, b) => a.hoursToFailure - b.hoursToFailure);
      const second_tube = this.tubes[1];

      hours -= second_tube.hoursToFailure;
      this.tubesReplaced += TUBES_IN_UNIT;
      this.changeTubes();
    }
  }
}

class Classroom {
  units: TubeUnit[] = [];

  constructor() {
    for (let i = 0; i < UNITS_IN_CLASS; i++) {
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
