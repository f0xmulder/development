import objectKeysToCamelCase from './objectKeysToCamelCase'

describe('objectKeysToCamelCase', () => {
  it('should convert a flat object', () => {
    const obj = {
      key: 'value',
      snake_key: 'value',
      number_one: 1,
      array_lvl1: ['one', 'two'],
    }

    expect(objectKeysToCamelCase(obj)).toEqual({
      key: 'value',
      snakeKey: 'value',
      numberOne: 1,
      arrayLvl1: ['one', 'two'],
    })
  })

  it('should keep null value', () => {
    const obj = {
      null_value: null,
      number_one: 1,
    }

    expect(objectKeysToCamelCase(obj)).toEqual({
      nullValue: null,
      numberOne: 1,
    })
  })

  it('should convert deeply nested objects', () => {
    const obj = {
      level_one: 'one',
      level_two: {
        snake_key: 'value',
        number_one: 1,
        array_lvl2: ['one', 'two'],
        deeper: {
          under_ground: 'value',
        },
      },
    }

    expect(objectKeysToCamelCase(obj)).toEqual({
      levelOne: 'one',
      levelTwo: {
        snakeKey: 'value',
        numberOne: 1,
        arrayLvl2: ['one', 'two'],
        deeper: {
          underGround: 'value',
        },
      },
    })
  })

  it('should convert keys in collections', () => {
    const obj = [
      {
        id: 1,
        sub_collection: [
          {
            hallo_daar: 'hey',
          },
        ],
      },
    ]

    expect(objectKeysToCamelCase(obj)).toEqual([
      {
        id: 1,
        subCollection: [
          {
            halloDaar: 'hey',
          },
        ],
      },
    ])
  })
})
