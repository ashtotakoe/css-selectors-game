import { BaseComponent } from '../../utils/base-component'
import { Editor } from '../editor/editor'
import { Playground } from '../playground/playground'
import { GameElements } from '../game-elements/game-elements'
import { Header } from '../header/header'
import { SideBar } from '../side-bar/side-bar'
import { EditorWrapper } from '../editor-wrapper/editor-wrapper'
import { EditorCSS } from '../editor-css/editor-css'
import { gameState } from '../../constants/game-state'
import { GamePassedPopup } from '../game-passed-popup/game-passed-popup'
import { Footer } from '../footer/footer'

export class Layout {
  public init(parent: HTMLElement): Record<string, BaseComponent | GameElements> {
    const header = new Header(parent)
    const main = new BaseComponent({ tag: 'main', parent })
    const gameBoard = new Playground(main.element)
    const editorWrapper = new EditorWrapper(main.element)
    const editorHTML = new Editor(editorWrapper.element)
    const gameElements = new GameElements({ playground: gameBoard.element, editor: editorHTML.element })
    gameElements.createElements(gameState.currentLevel.structure)
    const editorCSS = new EditorCSS(editorWrapper.element, gameElements)
    const sideBar = new SideBar(parent)
    const gamePassedPopup = new GamePassedPopup(parent)
    const footer = new Footer(parent)

    return {
      header,
      main,
      footer,
      editorWrapper,
      gameBoard,
      editorHTML,
      editorCSS,
      sideBar,
      gameElements,
      gamePassedPopup,
    }
  }
}
