import Rover from "../entity/Rover";
import DirectionState from "../states/DirectionState";
import EastState from "../states/EastState";
import NorthState from "../states/NorthState";
import SouthState from "../states/SouthState";
import WestState from "../states/WestState";


export default function DirectionStateFactory(directionIdentification: string, rover: Rover): DirectionState {

  switch(directionIdentification) {
    case 'N':
      return new NorthState(rover)
    
    case 'W':
      return new WestState(rover)
    
    case 'E':
      return new EastState(rover)
    
    case 'S':
      return new SouthState(rover)
  }

  throw new Error('Invalid direction identification')
}