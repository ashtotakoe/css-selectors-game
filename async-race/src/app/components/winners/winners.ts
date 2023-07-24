import { BaseComponent } from 'src/app/utils/base-component'
import { gameState } from 'src/app/utils/game-state'
import { httpFetcherWinners } from 'src/app/utils/http-fetcher-winners'
import { emitter } from 'src/app/utils/event-emitter'
import { WinnersLeaderBoard } from '../winners-leader-board/winners-leader-board'
import { Pagination } from '../pagination/pagination'

export class Winners extends BaseComponent {
  private heading = new BaseComponent({
    tag: 'h2',
    parent: this.element,
    attribute: {
      className: 'winners__heading',
    },
  })

  private winnersLeaderBoard = new WinnersLeaderBoard(this.element)

  private pagination = new Pagination(this.element, (paginationType: 'next' | 'previous') =>
    this.pagintationHandler(paginationType),
  )

  constructor() {
    super({
      tag: 'div',
      attribute: {
        className: 'winners',
      },
    })

    emitter.subscribe('render winners', () => this.renderWinners())
    this.renderWinners()
  }

  private pagintationHandler(paginationType: 'next' | 'previous'): void {
    if (paginationType === 'next') {
      gameState.currentWinnersPage += 1
      this.renderWinners()
      return
    }

    if (gameState.currentWinnersPage === 1) {
      return
    }

    gameState.currentWinnersPage -= 1
    this.renderWinners()
  }

  private async renderWinners(): Promise<void> {
    const winnersData = await httpFetcherWinners.getWinners()
    Object.assign(this.heading.element, {
      textContent: `Winners (${winnersData.length} cars recorded, currently on page ${gameState.currentWinnersPage})`,
    })

    this.winnersLeaderBoard.renderWinners()
  }
}