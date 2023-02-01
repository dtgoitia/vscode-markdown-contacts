import { Milliseconds } from "../domain/model";

export class Profiler {
  private startTime: Milliseconds | undefined;
  private endtTime: Milliseconds | undefined;
  constructor() { }
  public start(): void {
    this.startTime = this.currentTime();
  }

  public end(): void {
    this.endtTime = this.currentTime();
  }

  public delta(): Milliseconds | undefined {
    if (this.startTime === undefined) return;
    const end = this.endtTime || this.currentTime();
    return end - this.startTime;
  }

  private currentTime(): Milliseconds {
    return (new Date()).getTime();
  }
}