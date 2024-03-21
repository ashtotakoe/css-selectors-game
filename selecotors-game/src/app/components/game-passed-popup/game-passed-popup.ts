import { BaseComponent } from '../../utils/base-component'
import { emitter } from '../../utils/event-emitter'
import { manageLocalStorage } from '../../utils/manageLocalStrorage'

export class GamePassedPopup extends BaseComponent {
  private popup = new BaseComponent({
    parent: this.element,
    attribute: {
      className: 'popup__content',
    },
  })

  private popupHeading = new BaseComponent({
    tag: 'h3',
    parent: this.popup.element,
    attribute: {
      className: 'popup__content-heading',
      textContent: 'Congrads! You have passed the game',
    },
  })

  private popupMessage = new BaseComponent({
    tag: 'p',
    parent: this.popup.element,
    attribute: {
      className: 'popup__content-message',
      textContent: 'You can reset the progress and go though it one more time. Or you may just enjoy your time here)',
    },
  })

  private restartButton = new BaseComponent({
    tag: 'button',
    parent: this.popup.element,
    attribute: {
      className: 'popup__content-button',
      textContent: 'restart',
    },
  })

  private resumeButton = new BaseComponent({
    tag: 'button',
    parent: this.popup.element,
    attribute: {
      className: 'popup__content-button',
      textContent: 'resume',
    },
  })

  constructor(parent: HTMLElement) {
    super({
      parent,
      attribute: {
        className: 'popup hidden',
      },
    })

    this.restartButton.element.addEventListener('click', () => {
      this.element.classList.add('hidden')
      manageLocalStorage.reset()
    })

    this.resumeButton.element.addEventListener('click', () => {
      this.element.classList.add('hidden')
    })

    emitter.subscribe('show game passed', () => this.showGamePass())
  }

  private showGamePass(): void {
    this.element.classList.remove('hidden')
  }
}
