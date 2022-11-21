import Rover from "../entity/Rover";


export default abstract class DirectionState {
  protected rover: Rover

  constructor(rover: Rover) {
    this.rover = rover
  }

  abstract changeDirection(newDirection: string): void
  abstract changePosition(xCurrentCoordinate: number, yCurrentCoordinate: number): ResponseCoordinate
  abstract getIdentification(): string
}

export type ResponseCoordinate = {
  xCoordinate: number,
  yCoordinate: number,
}