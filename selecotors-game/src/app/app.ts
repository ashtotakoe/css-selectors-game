import { Layout } from './components/layout/layout'
import { gameState } from './constants/game-state'
import { manageLocalStorage } from './utils/manageLocalStrorage'

class App {
  public init(): void {
    manageLocalStorage.setLevelsStatus()
    gameState.currentLevelIndex = manageLocalStorage.currentlyOpenedLevel
    window.addEventListener('beforeunload', () => manageLocalStorage.setLocalStorage())
    const layout = new Layout()
    layout.init(document.body)
  }
}
const app = new App()
app.init()
