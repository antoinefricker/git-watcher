# git-whiner

> A node git watcher intended to nurture better practices and its arduino evil materialization to make them real.

## Demo

[![first board code demo](https://img.youtube.com/vi/EF2FVzAF1sc/0.jpg)](https://www.youtube.com/watch?v=EF2FVzAF1sc)

## Installation

> **Disclaimer** Requires an arduino hardware whose schema is provider in the [arduino section](#arduino-info)

### Install the package

`yarn add git-whiner -D`

### Add the scripts to your `package.json`:

-   `git-whiner-watch` will watch git status changes
-   `git-whiner-monitor` will send them to the arduino board

```
{
  "name": "git-whiner-client",
  //...
  "scripts": {
    "git-whiner-watch": "yarn nodemon  --quiet  --exec yarn watch",
    "git-whiner-monitor": "yarn monitor"
  },
  //...
}
```

## Scripts

### Build project

`yarn build`

### Watch git status changes

`yarn watch`

### Monitor git status through the arduino board

`yarn monitor`

## Arduino info

### Hardware requirements

-   Arduino Uno
-   passive buzzer
-   3 leds (ideally green, orange, red)
-   2 potentiometers
-   3 10KΩ resistances
-   a serial cable to connect to your computer
-   a bunch of jump wires

### Boards schemas

Sketchs can be found in the [arduino folder](https://github.com/antoinefricker/git-whiner/tree/main/arduino/boards)

### Sketches

Sketchs can be found in the [arduino folder](https://github.com/antoinefricker/git-whiner/tree/main/arduino/sketches)
