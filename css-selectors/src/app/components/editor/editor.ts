import { BaseComponent } from '../../utils/base-component'

export class Editor extends BaseComponent {
  constructor(parent: HTMLElement) {
    super({ parent, attribute: { className: 'editor' } })
  }
}
