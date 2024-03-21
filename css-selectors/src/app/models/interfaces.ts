import { LevelElementName } from '../types/type'

export interface BaseComponentProps {
  tag?: string
  attribute?: Record<string, string>
  parent?: HTMLElement
}

export interface LevelElement {
  name: LevelElementName
  children: LevelElement[]
  isTarget?: boolean
  className?: string
  attributes?: Record<string, string>
}

export interface GameElementsConstructor {
  playground: HTMLElement
  editor: HTMLElement
}

export interface CreateElementTupleParam {
  element: LevelElement
  parentPlayground: HTMLElement
  parentEditor: HTMLElement
  id: number
}

export interface GameElementConstructor {
  parent: HTMLElement
  id: number
  attribute?: Record<string, string>
  tag?: keyof HTMLElementTagNameMap
}

export interface LevelConstructor {
  serialNumber: number
  targetsCount?: number
  structure: LevelElement
  task?: string
  isDone?: string
  hint: string
}

export interface GameStateConstructor {
  currentLevel: number
}
