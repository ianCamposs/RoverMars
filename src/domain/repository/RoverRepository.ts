import Rover from "../entity/Rover";

export default interface RoverRepository {
  save(rover: Rover): Promise<void>
  getByUuid(uuid: string): Promise<RoverData | undefined>
  update(uuid: string, newDirection: string, newXCoordinate: number, newYCoordinate: number): Promise<void>
  getByPlateauUuid(uuid: string): Promise<RoverData[] | undefined>
}

export type RoverData = {
  uuid?: string,
  plateauUuid?: string,
  direction: string,
  xCoordinate: number,
  yCoordinate: number
}