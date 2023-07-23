import { BaseComponent } from 'src/app/utils/base-component'
import { Router } from 'src/app/models/router'
import { Header } from '../header/header'
import { Footer } from '../footer/footer'
import { Garage } from '../garage/garage'
import { WinnersLeaderBoard } from '../winners-leader-board/winners-leader-board'
import { NotFound } from '../not-found/not-found'

export class Layout {
  public init(parent: HTMLElement): Record<string, BaseComponent | Router> {
    const routes = {
      '#garage': new Garage(),
      '#winners': new WinnersLeaderBoard(),
      '#not-found': new NotFound(),
    }

    const header = new Header(parent)
    const main = new BaseComponent({
      tag: 'main',
      parent,
      attribute: {
        className: 'main',
      },
    })

    const router = new Router(routes, main.element)
    window.location.hash = '#garage'

    const footer = new Footer(parent)
    return { header, router, footer }
  }
}
