import { BaseComponent } from '../../utils/base-component'

export class Playground extends BaseComponent {
  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'playground' }, parent })
  }
}
