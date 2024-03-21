import { Level } from '../utils/level'
import { levels } from './levels'
import { GameStateConstructor } from '../models/interfaces'

class GameState {
  private _currentLevelIndex: number
  public isInputFitstTimeClicked: boolean = true

  constructor({ currentLevel }: GameStateConstructor) {
    this._currentLevelIndex = currentLevel
  }

  public get currentLevel(): Level {
    return levels[this._currentLevelIndex]
  }

  public get currentLevelIndex(): number {
    return this._currentLevelIndex
  }

  public set currentLevelIndex(level: number) {
    this.isInputFitstTimeClicked = true
    this._currentLevelIndex = level < levels.length ? level : 0
  }
}

export const gameState = new GameState({ currentLevel: 0 })
