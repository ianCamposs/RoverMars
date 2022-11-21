import DeployRoverUseCase from "../../app/usecases/DeployRoverUseCase"
import Plateau from "../../domain/entity/Plateau"
import PlateauRepositoryMemory from "../../infra/repository/memory/PlateuRepositoryMemory"
import RoverRepositoryMemory from "../../infra/repository/memory/RoverRepositoryMemory"


describe('Test deploy rover use case', () => {
  let plateauRepositoryMemory: PlateauRepositoryMemory
  let roverRepositoryMemory: RoverRepositoryMemory
  let plateau: Plateau

  beforeAll(async () => {
    plateauRepositoryMemory = new PlateauRepositoryMemory()
    roverRepositoryMemory = new RoverRepositoryMemory()
    
    plateau = new Plateau(10, 10)

    await plateauRepositoryMemory.save(plateau)
  })


  it('Should be able to create rover and move', async() => {
    const input = {
      plateauUuid: plateau.getUuid() as string,
      roverCoordinate: {
        xCoordinate: 1,
        yCoordinate: 2,
        currentDirection: 'N'
      },
      moveInstructions: 'LMLMLMLMM'
    }

    const deployRoverUseCase = new DeployRoverUseCase(plateauRepositoryMemory, roverRepositoryMemory)

    const newRoverPosition = await deployRoverUseCase.execute(input)
    expect(newRoverPosition).toBe('1 3 N')
  })

  it('Should return plateau not found error' , async () => {
    const notSavedPlateau = new Plateau(5, 5)

    const input = {
      plateauUuid: notSavedPlateau.getUuid() as string,
      roverCoordinate: {
        xCoordinate: 1,
        yCoordinate: 2,
        currentDirection: 'N'
      },
      moveInstructions: 'LMLMLMLMM'
    }

    const deployRoverUseCase = new DeployRoverUseCase(plateauRepositoryMemory, roverRepositoryMemory)

    expect(() => deployRoverUseCase.execute(input)).rejects.toThrow('Plateau not found')
  })
})