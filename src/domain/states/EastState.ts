import Rover from "../entity/Rover";
import DirectionState, { ResponseCoordinate } from "./DirectionState";
import NorthState from "./NorthState";
import SouthState from "./SouthState";


export default class EastState extends DirectionState {
  private directionIdentification: string = 'E'

  constructor(rover: Rover) {
    super(rover)
  }
  
  changeDirection(newDirection: string): void {
    if(newDirection === 'L') {
      this.rover.changeState(new NorthState(this.rover))
    }
    else {
      this.rover.changeState(new SouthState(this.rover))
    }
    return
  }

  changePosition(xCurrentCoordinate: number, yCurrentCoordinate: number): ResponseCoordinate {
    const newXCoordinate = xCurrentCoordinate + 1;
    
    return {
      xCoordinate: newXCoordinate,
      yCoordinate: yCurrentCoordinate
    }
  }

  getIdentification(): string {
    return this.directionIdentification
  }

}