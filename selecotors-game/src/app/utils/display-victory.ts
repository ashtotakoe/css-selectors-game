import { gameState } from '../constants/game-state'
import { levels } from '../constants/levels'
import { changeLevel } from './change-level'
import { emitter } from './event-emitter'

export const displayVictory = (levelIndex: number): void => {
  const currentStatus = levels[levelIndex - 1].isDone
  emitter.emit('display victory')
  levels[levelIndex - 1].isDone = currentStatus === 'with hint' ? 'with hint' : 'done'
  emitter.emit('rewrite statuses')
  changeLevel(levelIndex)

  if (gameState.currentLevelIndex < levels.length && levels.every((level) => level.isDone !== 'not done')) {
    emitter.emit('show game passed')
  }
}
