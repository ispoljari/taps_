import { Speed } from './speed';

export class Star {
  x: number;
  y: number;
  speedMult = 0.002;
  canvas: HTMLCanvasElement;
  isSpeedChanged = false;

  constructor(private existingCanvas: HTMLCanvasElement) {
    this.canvas = this.existingCanvas;
    this.repositionX();
    this.repositionY();
  }

  repositionX() {
    this.x = Math.random() * this.canvas.width;
  }

  repositionY() {
    this.y = Math.random() * this.canvas.height;
  }

  updatePos(speed: Speed) {
    if (speed === Speed.high && !this.isSpeedChanged) {
      this.changeSpeed(0.02);
      this.isSpeedChanged = true;
    }

    this.x += -0.05 + (this.x - this.canvas.width / 2) * this.speedMult;
    this.y += -0.05 + (this.y - this.canvas.height / 2) * this.speedMult;

    if (this.x > this.canvas.width || this.x < 0) {
      this.repositionX();
    }

    if (this.y > this.canvas.height || this.y < 0) {
      this.repositionY();
    }
  };

  changeSpeed(newSpeedMult: number) {
    const numOfSteps = 30;
    let target = numOfSteps;
    const delta = Math.abs(newSpeedMult - this.speedMult)/numOfSteps;

    const change = () => {
      const interval = setInterval(() => {
        target--;

        if (newSpeedMult > this.speedMult) {
          this.speedMult = this.speedMult + delta;
        } else {
          this.speedMult = this.speedMult - delta;
        }
      }, numOfSteps);

      if (target <= 1) {
        clearInterval(interval);
      }
    };

    change();
  }
};
