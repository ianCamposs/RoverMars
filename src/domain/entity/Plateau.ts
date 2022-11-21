import { v4 as uuidv4 } from 'uuid'

export default class Plateau {
  private xMinCoordinate: number
  private yMinCoordinate: number
  private uuid?: string

  constructor(
    readonly xMaxCoordinate: number,
    readonly yMaxCoordinate: number,
    uuid?: string
  ) {
    this.xMinCoordinate = 0
    this.yMinCoordinate = 0

    if (uuid) {
      this.uuid = uuid
    } else {
      this.generateUuid()
    }
  }

  getExtremeCoordinates() {
    return {
      xMin: this.xMinCoordinate,
      yMin: this.yMinCoordinate,
      xMax: this.xMaxCoordinate,
      yMax: this.yMaxCoordinate
    }
  }

  isValidCoordinate(xCoordinate: number, yCoordinate: number): boolean {
    if (xCoordinate > this.xMaxCoordinate || xCoordinate < this.xMinCoordinate) {
      return false
    }

    if (yCoordinate > this.yMaxCoordinate || yCoordinate < this.yMinCoordinate) {
      return false
    }

    return true
  }

  getUuid(): string | undefined {
    return this.uuid
  }

  generateUuid() {
    if (!this.uuid) {
      this.uuid = uuidv4()
    }
  }
}