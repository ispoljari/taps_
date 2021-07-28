import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, ViewChild, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Star } from './star';
import { Speed } from './speed';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})

export class BackgroundComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('myCanvas', {static: true}) myCanvas: ElementRef<HTMLCanvasElement>;

  @Input() speed: Speed;

  window: Window;
  starList: Array<Star> = [];
  starCountTarget = 100;

  private ctx: CanvasRenderingContext2D;
  private animationFrameID: number;

  constructor(@Inject('Window') scopedWindow: Window) {
    if (scopedWindow) {
      this.window = scopedWindow;
    } else {
      this.window = window;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setCanvasSize();
    this.generateStars();
  }

  ngAfterViewInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');

    if(this.ctx) {
      this.setCanvasSize();
      this.generateStars();
      this.setAnimationFrame();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.speed) {
      this.window.cancelAnimationFrame(this.animationFrameID);

      if(this.ctx) {
        this.setAnimationFrame();
      }
    }
  }

  ngOnDestroy(): void {
    this.window.cancelAnimationFrame(this.animationFrameID);
  }

  animate() {
    this.paintSpace();

    for (const star of this.starList) {
      this.ctx.fillStyle = 'rgb(255,255,255)';

      this.ctx.fillRect(
        star.x,
        star.y,
        1.5,
        1.5
        );

      star.updatePos(this.speed);
    }

    this.window.requestAnimationFrame(() => this.animate());
  };

  private setCanvasSize() {
    this.myCanvas.nativeElement.width = this.window.innerWidth;
    this.myCanvas.nativeElement.height = this.window.innerHeight;
    this.myCanvas.nativeElement.focus();
  };

  private setAnimationFrame() {
    this.animationFrameID =  this.window.requestAnimationFrame(() => this.animate());
  }

  private generateStars() {
    this.setTargetNumOfStars();

    while (this.starList.length < this.starCountTarget) {
      const star = new Star(this.myCanvas.nativeElement);
      this.starList.push(star);
    }
  }

  private setTargetNumOfStars() {
    if (this.window.innerWidth < 500) {
      this.starCountTarget = 50;
    } else if (this.window.innerWidth >= 500 && this.window.innerWidth < 1000) {
      this.starCountTarget = 100;
    } else if (this.window.innerWidth >= 1000) {
      this.starCountTarget = 200;
    }
  }

  private paintSpace(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    this.ctx.fillRect(
      0,
      0,
      this.myCanvas.nativeElement.width,
      this.myCanvas.nativeElement.height
    );
  }
}
