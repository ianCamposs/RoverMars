import FullMoveRoverUseCase, { Input } from "../../app/usecases/FullMoveRoverUseCase"
import PlateauRepositoryMemory from "../../infra/repository/memory/PlateuRepositoryMemory"
import RoverRepositoryMemory from "../../infra/repository/memory/RoverRepositoryMemory"


describe('Full rover movimentation use case ', () => { 
  
  let plateauRepositoryMemory: PlateauRepositoryMemory
  let roverRepositoryMemory: RoverRepositoryMemory

  beforeAll(() => {
    plateauRepositoryMemory = new PlateauRepositoryMemory()
    roverRepositoryMemory = new RoverRepositoryMemory()
  })
  
  it('Should be able to create plateau, deploy rover and move it', async () => {
    const input: Input = {
      plateauCoordinate: {
        xMaxCoordinate: 10,
        yMaxCoordinate: 10
      },
      roverCoordinate: {
        xCoordinate: 1,
        yCoordinate: 2,
        currentDirection: 'N'
      },
      moveInstructions: 'LMLMLMLMM'
    }

    const fullMoveRoverUseCase = new FullMoveRoverUseCase(plateauRepositoryMemory, roverRepositoryMemory)

    const newRoverPosition = await fullMoveRoverUseCase.execute(input)

    expect(newRoverPosition).toBe('1 3 N')
  })

 })