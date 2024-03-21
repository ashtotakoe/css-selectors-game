import { BaseComponent } from '../../utils/base-component'

export class Footer extends BaseComponent {
  private author = new BaseComponent({
    tag: 'p',
    parent: this.element,
    attribute: {
      className: 'footer__author',
      textContent: 'made by ',
    },
  })

  private githubLink = new BaseComponent({
    tag: 'a',
    parent: this.author.element,
    attribute: {
      className: 'footer__link',
      href: 'https://github.com/ashtotakoe',
      textContent: '@ashtotakoe',
    },
  })

  private linkToCourse = new BaseComponent({
    tag: 'a',
    parent: this.element,
    attribute: {
      className: 'footer__link',
      textContent: 'course: JSFE2023Q1',
      href: 'https://rs.school/js/',
    },
  })

  private logo = new BaseComponent({
    tag: 'div',
    parent: this.element,
    attribute: {
      className: 'footer__logo',
    },
  })
  constructor(parent: HTMLElement) {
    super({
      parent,
      tag: 'footer',
      attribute: {
        className: 'footer',
      },
    })
  }
}
