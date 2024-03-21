import { CreateElementTupleParam, GameElementsConstructor, LevelElement } from '../../models/interfaces'
import { GameElement } from '../../utils/game-element'
import { gameElementClasses } from '../../constants/game-element-classes'
import { gameElementTextNodes } from '../../constants/game-element-text-nodes'
import { emitter } from '../../utils/event-emitter'
import { BaseComponent } from '../../utils/base-component'

export class GameElements {
  private playground: HTMLElement
  private editor: HTMLElement
  private id = 0

  private playgroundElements: GameElement[] = []
  private editorElements: GameElement[] = []

  public abstractDOMModel: HTMLElement = new BaseComponent({
    tag: 'section',
  }).element

  constructor({ playground, editor }: GameElementsConstructor) {
    this.playground = playground
    this.editor = editor
    emitter.subscribe('change level', (args: LevelElement) => this.createElements(args))
  }

  public createElements(level: LevelElement): void {
    this.resetAll()
    const baseEntity = this.createAbstractDOM(level, this.abstractDOMModel) // не нравится

    const [textBeforeBaseElement, textAfterBaseElement] = gameElementTextNodes[level.name]
    const [playgroundElement, editorElement] = this.createElementTuple({
      element: level,
      parentPlayground: this.playground,
      parentEditor: this.editor,
      id: this.id++,
    })

    this.playgroundElements.push(playgroundElement)
    this.editorElements.push(editorElement)

    editorElement.element.append(textBeforeBaseElement)

    this.childrenIteration(level, [playgroundElement, editorElement], baseEntity)

    editorElement.element.append(textAfterBaseElement)
  }

  private childrenIteration(
    level: LevelElement,
    [playgroundElement, editorElement]: GameElement[],
    baseEntity: HTMLElement,
  ): void {
    level.children.forEach((element) => {
      const elementEntity = this.createAbstractDOM(element, baseEntity)
      const [playgroundElem, editorElem] = this.createElementTuple({
        element,
        id: this.id++,
        parentPlayground: playgroundElement.element,
        parentEditor: editorElement.element,
      })

      const [textBeforeEditorElement, textAfterEditorElement] = this.getTextNodes(element)
      this.playgroundElements.push(playgroundElem)
      this.editorElements.push(editorElem)
      editorElem.element.append(textBeforeEditorElement)

      if (element.children.length !== 0) {
        element.children.forEach((child) => {
          this.createAbstractDOM(child, elementEntity)
          const [playgroundChild, editorChild] = this.createElementTuple({
            element: child,
            parentPlayground: playgroundElem.element,
            parentEditor: editorElem.element,
            id: this.id++,
          })

          const [editorChildTextContent] = this.getTextNodes(child)
          Object.assign(editorChild.element, { textContent: editorChildTextContent })
          this.playgroundElements.push(playgroundChild)
          this.editorElements.push(editorChild)
        })
      }

      editorElem.element.append(textAfterEditorElement)
    })
  }

  private getTextNodes(element: LevelElement): string[] {
    let [openingTag] = gameElementTextNodes[element.name]
    const closingTag = gameElementTextNodes[element.name][1]

    if (element.className) {
      openingTag += ' class="'
      element.className.split(' ').forEach((className) => {
        openingTag += `${className} `
      })

      openingTag = openingTag
        .split('')
        .slice(0, openingTag.length - 1)
        .join('')

      openingTag += '"'
    }

    if (element.attributes) {
      openingTag += ' '

      Object.keys(element.attributes).forEach((attribute) => {
        if (element.attributes !== undefined) {
          openingTag += attribute
          const value = element.attributes[attribute]
          if (value !== '') {
            openingTag += `="${value}"`
          }
        }
      })
    }

    openingTag += '>'

    return [openingTag, closingTag]
  }

  private createElementTuple({ element, parentPlayground, parentEditor, id }: CreateElementTupleParam): GameElement[] {
    const playgroundElement = new GameElement({
      parent: parentPlayground,
      id,
      attribute: {
        className: gameElementClasses[element.name].playground,
      },
    })
    const editorElement = new GameElement({
      parent: parentEditor,
      id,
      attribute: {
        className: gameElementClasses[element.name].editor,
      },
    })
    const gameElementTuple = [playgroundElement, editorElement]

    gameElementTuple.forEach((gameElement) => {
      gameElement.element.addEventListener('mouseover', (e: Event) => this.mouseEventHandler(e))
      gameElement.element.addEventListener('mouseout', (e: Event) => this.mouseEventHandler(e))
    })

    if (element.isTarget) {
      playgroundElement.element.classList.add('jumping')
    }

    return gameElementTuple
  }

  private createAbstractDOM(element: LevelElement, parent: HTMLElement): HTMLElement {
    const entity = new BaseComponent({
      tag: element.name === 'base' ? 'div' : element.name,
    }).element

    if (element.isTarget) {
      entity.setAttribute('data-target', 'true')
    }

    if (element.className) {
      Object.assign(entity, { className: element.className })
    }

    if (element.attributes) {
      Object.keys(element.attributes).forEach((attribute) => {
        if (element.attributes !== undefined) {
          entity.setAttribute(attribute, element.attributes[attribute])
        }
      })
    }

    parent.append(entity)

    return entity
  }

  private mouseEventHandler(e: Event): boolean {
    this.playgroundElements.forEach((playgroundElement) => playgroundElement.element.classList.remove('linted'))
    this.editorElements.forEach((editorElement) => editorElement.element.classList.remove('linted'))

    const playgroundTarget = this.playgroundElements.find((gameElement) => gameElement.element === e.target)
    const editorTarget = this.editorElements.find((gameElement) => gameElement.element === e.target)

    if (editorTarget?.id === 0 || playgroundTarget?.id === 0) {
      return false
    }

    if (playgroundTarget !== undefined) {
      this.lintElement(playgroundTarget, this.editorElements, e)
    }

    if (editorTarget !== undefined) {
      this.lintElement(editorTarget, this.playgroundElements, e)
    }

    return false
  }

  private lintElement(target: GameElement, lintingTargetArray: GameElement[], event: Event): boolean {
    target.element.classList.add('linted')

    const lintingTarget = lintingTargetArray.find((element) => element.id === target.id)

    if (event.type === 'mouseover') {
      lintingTarget?.element.classList.add('linted')
      return true
    }

    lintingTarget?.element.classList.remove('linted')
    return true
  }

  private resetAll(): void {
    this.playgroundElements = []
    this.editorElements = []
    this.id = 0
    this.playground.replaceChildren()
    this.editor.replaceChildren()
    this.abstractDOMModel = new BaseComponent({
      tag: 'section',
    }).element
  }
}
