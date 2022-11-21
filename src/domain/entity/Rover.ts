import DirectionStateFactory from "../factory/DirectionStateFactory";
import DirectionState from "../states/DirectionState";
import Plateau from "./Plateau";
import { v4 as uuidv4 } from 'uuid'


export default class Rover {

  private changeDirectionOrders: string[]
  private changePositionOrder: string[]
  private currentDirectionState: DirectionState
  private uuid?: string
  private plateauUuid?: string

  constructor(
    readonly plateau: Plateau,
    private xCurrentCoordinate: number,
    private yCurrentCoordinate: number,
    private directionIdentification: string,
  ) {
    
    this.generateUuid()
    this.plateauUuid = this.plateau.getUuid()
    this.currentDirectionState = DirectionStateFactory(this.directionIdentification, this)
    this.changeDirectionOrders = ['L', 'R']
    this.changePositionOrder = ['M']
    
    if (!this.plateau.isValidCoordinate(this.xCurrentCoordinate, this.yCurrentCoordinate)) {
      throw new Error('Can not create Rover out plateau area')
    }
  }

  changeState(newState: DirectionState) {
    this.currentDirectionState = newState
  }

  move(inputMovimentation: string) {
    const separatedInputMovimentation = inputMovimentation.split('')

    separatedInputMovimentation.forEach((input) => {

      if (this.changeDirectionOrders.includes(input)) {
        this.currentDirectionState.changeDirection(input)
      } 
      
      if(this.changePositionOrder.includes(input)) {
        this.changePosition()
      }
    })

    return `${this.xCurrentCoordinate} ${this.yCurrentCoordinate} ${this.currentDirectionState.getIdentification()}`
  }

  private changePosition() {
    
    const newCoordinate = this.currentDirectionState.changePosition(this.xCurrentCoordinate, this.yCurrentCoordinate)

    if (!this.plateau.isValidCoordinate(newCoordinate.xCoordinate, newCoordinate.yCoordinate)) {
      throw new Error('Invalid new coordinate position')
    }

    this.xCurrentCoordinate = newCoordinate.xCoordinate
    this.yCurrentCoordinate = newCoordinate.yCoordinate
  }
  
  getUuid(): string | undefined {
    return this.uuid
  }

  getCurrentDirection() {
    return this.currentDirectionState.getIdentification()
  }

  getXCoordinate() {
    return this.xCurrentCoordinate
  }

  getYCoordinate() {
    return this.yCurrentCoordinate
  }

  setCurrentDirection(newDirection: string) {
    this.currentDirectionState = DirectionStateFactory(newDirection, this)
  }

  setXCoordinate(newXCoordinate: number) {
    this.xCurrentCoordinate = newXCoordinate
  }

  setYCoordinate(newYCoordinate: number) {
    this.yCurrentCoordinate = newYCoordinate
  }

  generateUuid() {
    if (!this.uuid) {
      this.uuid = uuidv4()
    }
  }
}