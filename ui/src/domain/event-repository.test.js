// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import EventRepository from './event-repository'

const eventMock = {
  id: 1,
  title: 'Hi',
  startDate: new Date(null),
  location: 'Somewhere',
  registrationUrl: 'https://www.example.com',
}

const eventListMock = {
  results: [eventMock, eventMock],
}

describe('Event repository', () => {
  describe('Getting a list of all events', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(eventListMock),
        }),
      )
    })

    afterEach(() => global.fetch.mockRestore())

    it('should return a list of events', async () => {
      const result = await EventRepository.getAll('page=1')
      expect(result).toEqual(eventListMock)
      expect(global.fetch).toHaveBeenCalledWith('/api/events?page=1')
    })
  })

  describe('Creating an event', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 201,
          json: () => Promise.resolve(eventMock),
        }),
      )
    })

    afterEach(() => global.fetch.mockRestore())

    it('should create an event', async () => {
      const result = await EventRepository.create(eventMock)
      expect(result).toEqual(eventMock)
      expect(global.fetch).toHaveBeenCalledWith('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': undefined,
        },
        body: JSON.stringify(eventMock),
      })
    })
  })

  describe('Error while creating an event', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        }),
      )
    })

    afterEach(() => global.fetch.mockRestore())

    it('should throw an error', async () => {
      let error

      try {
        await EventRepository.create(eventMock)
      } catch (e) {
        error = e
      }

      expect(error).toEqual(new Error('Kan het evenement niet aanmaken'))
    })
  })
})
