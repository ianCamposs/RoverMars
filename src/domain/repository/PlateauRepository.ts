import Plateau from "../entity/Plateau";


export default interface PlateauRepository {
  save(plateau: Plateau): Promise<void>
  getByUuid(uuid: string): Promise<PlateauData | undefined>
}

export type NewCoordinate = {
  xCoordinate: number,
  yCoordinate: number,
}

export type PlateauData = {
  uuid?: string,
  xMaxCoordinate: number,
  xMinCoordinate: number,
  yMaxCoordinate: number,
  yMinCoordinate: number
}