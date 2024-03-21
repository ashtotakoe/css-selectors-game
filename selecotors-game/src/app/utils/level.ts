import { LevelElement, LevelConstructor } from '../models/interfaces'

export class Level {
  public serialNumber: number
  public structure: LevelElement
  public task: string
  public targetsCount: number
  public isDone: string
  public hint: string

  constructor({ serialNumber, structure, hint, targetsCount = 1, task = 'sorry, no task yet!' }: LevelConstructor) {
    this.serialNumber = serialNumber
    this.structure = structure
    this.task = `Your task: ${task}`
    this.targetsCount = targetsCount
    this.isDone = 'not done'
    this.hint = hint
  }
}
