import { gameState } from '../../constants/game-state'
import { BaseComponent } from '../../utils/base-component'
import { displayVictory } from '../../utils/display-victory'
import { emitter } from '../../utils/event-emitter'
import { GameElements } from '../game-elements/game-elements'

export class EditorCSS extends BaseComponent {
  private answerForm = new BaseComponent({
    tag: 'input',
    parent: this.element,
    attribute: {
      className: 'editor-css__answer',
      type: 'text',
      placeholder: 'type your selector here',
    },
  })

  private submitButton = new BaseComponent({
    tag: 'button',
    parent: this.element,
    attribute: {
      className: 'editor-css__button',
      textContent: 'Enter',
    },
  })

  private editorDecoration = new BaseComponent({
    tag: 'div',
    parent: this.element,
    attribute: {
      className: 'editor-css__decoration',
      innerHTML: `
      {<br>
       /* Styles would go here. */<br>
      }
      `,
    },
  })

  public gameElements: GameElements

  constructor(parent: HTMLElement, gameElements: GameElements) {
    super({ parent, attribute: { className: 'editor-css' } })
    this.gameElements = gameElements
    this.init()
  }

  private init(): void {
    this.answerForm.element.addEventListener('click', () => this.inputEventHandler())
    this.submitButton.element.addEventListener('click', (e: Event) => this.submitEventHandler(e))
    document.body.addEventListener('keypress', (e: Event) => this.submitEventHandler(e))

    emitter.subscribe('set input text default', () => {
      this.setInputTextDefault()
    })
    emitter.subscribe('show hint', () => this.showHint())
  }

  private inputEventHandler(): boolean {
    if (!gameState.isInputFitstTimeClicked) {
      return false
    }
    if (this.answerForm.element instanceof HTMLInputElement) {
      Object.assign(this.answerForm.element, { value: '' })
      gameState.isInputFitstTimeClicked = false
    }
    return true
  }

  private setInputTextDefault(): void {
    this.answerForm.inputValue = ''
  }

  private submitEventHandler(e: Event): boolean {
    if (e instanceof KeyboardEvent && e.code !== 'Enter') {
      return false
    }

    if (this.answerForm.element instanceof HTMLInputElement) {
      if (this.validateAnswer(this.answerForm.element.value)) {
        gameState.currentLevelIndex += 1
        displayVictory(gameState.currentLevelIndex)
        return true
      }
    }
    emitter.emit('display error')
    return true
  }

  private validateAnswer(selector: string): boolean {
    let targetList: NodeListOf<Element>
    let isEveryElementTarget = true

    try {
      targetList = this.gameElements.abstractDOMModel.querySelectorAll(selector)
    } catch {
      return false
    }

    if (!targetList.length) {
      return false
    }

    const [firstElement] = targetList
    if (gameState.currentLevel.targetsCount === 1 && firstElement.getAttribute('data-target')) {
      return true
    }

    targetList.forEach((target) => {
      if (!target.getAttribute('data-target')) {
        isEveryElementTarget = false
      }
    })

    if (targetList.length !== gameState.currentLevel.targetsCount || !isEveryElementTarget) {
      return false
    }

    return true
  }

  private showHint(): void {
    gameState.currentLevel.isDone = 'with hint'
    emitter.emit('rewrite statuses')
    this.typewriterLikeHintPrint(gameState.currentLevel.hint)
  }

  private typewriterLikeHintPrint(hint: string): void {
    this.answerForm.inputValue = ''
    hint.split('').forEach((char, index) => {
      setTimeout(() => {
        this.answerForm.inputValue += char
      }, index * 100)
    })
  }
}
