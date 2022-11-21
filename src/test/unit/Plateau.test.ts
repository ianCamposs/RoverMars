import Plateau from "../../domain/entity/Plateau"


describe('Plateau unit tests', () => {

  it('Should be able to create plateau', () => {
    const xMaxCoordinate = 10
    const yMaxCoordinate = 10
    
    const plateau = new Plateau(xMaxCoordinate, yMaxCoordinate)

    expect(plateau.getExtremeCoordinates().xMin).toBe(0)
    expect(plateau.getExtremeCoordinates().yMin).toBe(0)
    expect(plateau.getExtremeCoordinates().xMax).toBe(10)
    expect(plateau.getExtremeCoordinates().yMax).toBe(10)
  })
})