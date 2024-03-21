import { gameState } from '../constants/game-state'
import { levels } from '../constants/levels'
import { emitter } from './event-emitter'

export const changeLevel = (levelIndex: number): void => {
  gameState.currentLevelIndex = levelIndex < levels.length ? levelIndex : 0
  emitter.emit('change level', gameState.currentLevel.structure)
  emitter.emit('set input text default')
  emitter.emit('set task', gameState.currentLevel)
  emitter.emit('lint level', gameState.currentLevelIndex)
}
