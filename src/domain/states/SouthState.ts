import Rover from "../entity/Rover";
import DirectionState, { ResponseCoordinate } from "./DirectionState";
import EastState from "./EastState";
import WestState from "./WestState";


export default class SouthState extends DirectionState {
  private directionIdentification: string = 'S'

  constructor(rover: Rover) {
    super(rover)
  }
  
  changeDirection(newDirection: string): void {
    if(newDirection === 'L') {
      this.rover.changeState(new EastState(this.rover))
    }
    else {
      this.rover.changeState(new WestState(this.rover))
    }
    return
  }

  changePosition(xCurrentCoordinate: number, yCurrentCoordinate: number): ResponseCoordinate {
    const newYCoordinate = yCurrentCoordinate - 1
 
    return {
      xCoordinate: xCurrentCoordinate,
      yCoordinate: newYCoordinate
    }
  }

  getIdentification(): string {
    return this.directionIdentification
  }
} 