import { BaseComponent } from '../../utils/base-component'
import { emitter } from '../../utils/event-emitter'

export class EditorWrapper extends BaseComponent {
  constructor(parent: HTMLElement) {
    super({ parent, attribute: { className: 'editor-wrapper' } })
    emitter.subscribe('display error', () => this.answerDisplay('wrong'))
    emitter.subscribe('display victory', () => this.answerDisplay('correct'))
  }

  private answerDisplay(type: 'wrong' | 'correct'): void {
    this.element.classList.add(type)
    setTimeout(() => {
      this.element.classList.remove(type)
    }, 400)
  }
}
