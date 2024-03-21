import { Level } from '../utils/level'

const levels: Level[] = [
  new Level({
    serialNumber: 1,
    structure: {
      name: 'base',
      className: 'table',
      isTarget: true,
      children: [],
    },
    hint: '.table',
    task: 'select the table',
  }),

  new Level({
    serialNumber: 2,
    targetsCount: 2,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'plate',
          isTarget: true,
          children: [],
        },
        {
          name: 'plate',
          isTarget: true,
          children: [],
        },
      ],
    },
    hint: 'plate',
    task: 'select the plates',
  }),

  new Level({
    serialNumber: 3,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'plate',
          children: [],
        },
        {
          name: 'bento',
          isTarget: true,
          children: [],
        },
      ],
    },
    hint: 'bento',
    task: 'select the bento',
  }),

  new Level({
    serialNumber: 4,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'plate',
          attributes: {
            id: 'appleHolder',
          },
          isTarget: true,
          children: [{ name: 'apple', children: [] }],
        },
        {
          name: 'plate',
          children: [],
        },
      ],
    },
    hint: '#appleHolder',
    task: 'select the plate with an apple on it',
  }),

  new Level({
    serialNumber: 5,
    targetsCount: 2,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'plate',
          className: 'apple-holder',
          isTarget: true,
          children: [{ name: 'apple', children: [] }],
        },
        {
          name: 'plate',
          children: [],
        },
        {
          name: 'plate',
          className: 'apple-holder',
          isTarget: true,
          children: [{ name: 'apple', children: [] }],
        },
      ],
    },
    hint: '.apple-holder',
    task: 'select all of the plates with an apple on it',
  }),

  new Level({
    serialNumber: 6,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'plate',
          children: [{ name: 'apple', children: [] }],
        },
        {
          name: 'plate',
          children: [],
        },
        {
          name: 'bento',
          children: [{ name: 'apple', isTarget: true, children: [] }],
        },
      ],
    },
    hint: 'bento apple',
    task: 'select an apple on bento',
  }),

  new Level({
    serialNumber: 7,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'plate',
          className: 'fancy',
          children: [],
        },
        {
          name: 'plate',
          className: 'fancy',
          children: [],
        },
        {
          name: 'plate',
          isTarget: true,
          attributes: {
            fancy: '',
          },
          children: [],
        },
      ],
    },
    hint: 'plate[fancy]',
    task: 'select the plate with the fancy attribute',
  }),

  new Level({
    serialNumber: 8,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'bento',
          attributes: {
            fancy: 'no',
          },
          children: [],
        },
        {
          name: 'bento',
          attributes: {
            fancy: 'no',
          },
          children: [],
        },
        {
          name: 'bento',
          attributes: {
            fancy: 'yes',
          },
          children: [
            {
              name: 'apple',
              children: [],
              isTarget: true,
            },
          ],
        },
      ],
    },
    hint: 'bento[fancy=yes] apple',
    task: 'select an apple on bento with the truly fancy attribute',
  }),

  new Level({
    serialNumber: 9,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'plate',
          children: [],
        },
        {
          name: 'plate',
          isTarget: true,
          children: [],
        },
        {
          name: 'plate',
          children: [],
        },
      ],
    },
    hint: '.table :nth-child(2)',
    task: 'select the second plate',
  }),

  new Level({
    serialNumber: 10,
    targetsCount: 5,
    structure: {
      name: 'base',
      className: 'table',
      children: [
        {
          name: 'bento',
          isTarget: true,
          attributes: {
            fancy: 'no',
          },
          children: [],
        },
        {
          name: 'bento',
          isTarget: true,
          attributes: {
            fancy: 'yes',
          },
          children: [
            {
              name: 'apple',
              isTarget: true,
              children: [],
            },
          ],
        },
        {
          name: 'bento',
          isTarget: true,
          attributes: {
            fancy: 'not-sure',
          },
          children: [
            {
              name: 'apple',
              isTarget: true,
              children: [],
            },
          ],
        },
      ],
    },
    hint: '.table *',
    task: 'select everything on the table',
  }),
]
export { levels }
