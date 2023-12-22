# What

The test is to write a simulation algorithm.

# Problem statement

In a University, there is a classroom, in that classroom, there are 4 fluorescent tube units, each unit contains 4 fluorescent tubes.
The classroom is used 15 hours a day, 5 times a week, 9 months a year.
Every fluorescent tube works for a fixed amount of hours, that amount is returned by a function called "rand()" that returns an integer number from 100 to 200 that represents the number of hours that the fluorescent tube will work before breaking.
Once 2 fluorescent tubes fail in a single unit, you should replace all 4 tubes.
Each fluorescent tube costs 7 $USD.

The algorithm should print:

- How many fluorescent tubes were broken in 1 year in that classroom?
- How much money do fluorescent tubes cost the University per year per classroom?

# Solution

This is my shot at this problem. See `index.ts`.