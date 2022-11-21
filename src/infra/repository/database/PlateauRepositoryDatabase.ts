import Plateau from "../../../domain/entity/Plateau";
import PlateauRepository, { PlateauData } from "../../../domain/repository/PlateauRepository";

export default class PlateauRepositoryDatabase implements PlateauRepository {

  constructor(
    readonly connection: any
  ) {}
  
  async save(plateau: Plateau): Promise<void> {
    await this.connection('plateau').insert(plateau)
  }

  async getByUuid(uuid: string): Promise<PlateauData | undefined> {
    const plateau = await this.connection('plateau')
      .select('*')
      .where('uuid', uuid)
      .first()
    
    return plateau
  }

}