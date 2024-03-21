import { BaseComponent } from '../../utils/base-component'

export class Header extends BaseComponent {
  private heading = new BaseComponent({
    tag: 'h1',
    parent: this.element,
    attribute: { textContent: 'RSS-CSS-Selectors', className: 'header__heading' },
  })

  constructor(parent: HTMLElement) {
    super({ tag: 'header', parent, attribute: { className: 'header' } })
  }
}
