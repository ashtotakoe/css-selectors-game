import { defaultLevelsStatus } from '../constants/default-levels-status'
import { gameState } from '../constants/game-state'
import { levels } from '../constants/levels'
import { changeLevel } from './change-level'
import { emitter } from './event-emitter'

export class ManageLocalStorage {
  public setLevelsStatus(): boolean {
    const localStorageTarget = localStorage.getItem('passed levels')
    if (localStorageTarget === null) {
      localStorage.setItem('passed levels', JSON.stringify(defaultLevelsStatus))
      return true
    }

    JSON.parse(localStorageTarget).forEach((levelStatus: string, index: number) => {
      levels[index].isDone = levelStatus
    })

    return true
  }

  public get currentlyOpenedLevel(): number {
    const localStorageTarget = localStorage.getItem('current level')
    if (localStorageTarget === null) {
      localStorage.setItem('current level', String(0))
      return 0
    }

    return Number(localStorageTarget)
  }

  public setLocalStorage(): void {
    localStorage.setItem(
      'passed levels',
      JSON.stringify(defaultLevelsStatus.map((_, levelIndex) => levels[levelIndex].isDone)),
    )

    localStorage.setItem('current level', String(gameState.currentLevelIndex))
  }

  public reset(): void {
    localStorage.clear()
    levels.forEach((level) => {
      Object.assign(level, { isDone: 'not done' })
    })
    emitter.emit('rewrite statuses')
    changeLevel(0)
  }
}

export const manageLocalStorage = new ManageLocalStorage()
