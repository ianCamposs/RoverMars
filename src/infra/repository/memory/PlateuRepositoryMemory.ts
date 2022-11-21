import Plateau from "../../../domain/entity/Plateau";
import PlateauRepository, { NewCoordinate, PlateauData } from "../../../domain/repository/PlateauRepository";


export default class PlateauRepositoryMemory implements PlateauRepository {
  plateaus: Plateau[]

  constructor() {
    this.plateaus = []
  }

  async save(plateau: Plateau): Promise<void> {
    this.plateaus.push(plateau)
  }

  async getByUuid(uuid: string): Promise<PlateauData | undefined> {
    const foundPlateau =  this.plateaus.find((plateu) => plateu.getUuid() === uuid)
    
    if(!foundPlateau) {
      return undefined 
    }

     return {
      uuid: foundPlateau.getUuid(),
      xMaxCoordinate: foundPlateau.getExtremeCoordinates().xMax,
      xMinCoordinate: foundPlateau.getExtremeCoordinates().xMin,
      yMaxCoordinate: foundPlateau.getExtremeCoordinates().yMax,
      yMinCoordinate: foundPlateau.getExtremeCoordinates().yMin
    }
  }
}