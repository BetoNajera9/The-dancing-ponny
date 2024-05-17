import supertest from 'supertest'

import { RateLimiter } from '../common/middlewares'
import { server } from '../app'
import {
	ResponseErrorTooManyRatesMock,
	ResponseRateSuccessMock,
	UserBlockMock,
	RateMock,
	UserMock,
} from './mock'

//* Mongoose Mock
jest.mock('mongoose', () => {
	const actualMongoose = jest.requireActual('mongoose')

	return {
		...actualMongoose,
		Schema: actualMongoose.Schema,
		model: jest.fn().mockReturnValue({
			findOne: () => {
				return UserMock
			},
			findById: (id: string) => {
				switch (id) {
					case '6646d1e8a418409f0fa75a86':
						return {
							_id: '6646d1d8a418409f0fa75a7e',
							name: 'Bell Gamgee Pumpkin Pie 01',
							description:
								'Enclavada en el corazón de la Comarca, La Taberna del Tuk es el lugar de encuentro favorito de hobbits y viajeros de todas partes de la Tierra Media. Con su acogedor ambiente, chimeneas humeantes y sillas cómodas, es el sitio perfecto para disfrutar de una comida reconfortante después de un largo día de aventuras. Los platos son preparados con los ingredientes más frescos del jardín de los Tuk y acompañados por la mejor cerveza de la Comarca',
							price: 3,
							rate: [
								{
									_id: '6646fc6f447041aff1501cf6',
									userId: '6646a3af9452b3b7ddd05118',
									stars: 4,
									comments: 'This is a comments',
								},
							],
							updatedAt: '2024-05-17T06:12:14.838Z',
							save: jest.fn(),
						}

					default:
						return UserBlockMock
				}
			},
		}),
		connect: jest.fn().mockResolvedValue({}),
		connection: {
			on: jest.fn(),
			once: jest.fn(),
		},
	}
})

//* Jsonwebtoken Mock
jest.mock('jsonwebtoken', () => ({
	...jest.requireActual('jsonwebtoken'), // Conserva las implementaciones reales de jsonwebtoken
	verify: jest.fn().mockReturnValue({ userId: 'user123' }), // Devuelve siempre este objeto
}))

afterAll((done) => {
	server.close(done)
})

describe('Rate Endpoint', () => {
	let rateLimiter: RateLimiter

	beforeEach(() => {
		rateLimiter = new RateLimiter(100, 60 * 60 * 1000)
	})

	it('Obtain a successful response', async () => {
		const response = await supertest(server)
			.post('/dish/6646d1e8a418409f0fa75a86/rate')
			.set('Authorization', 'Bearer token')
			.send(RateMock)
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual(ResponseRateSuccessMock)
	})

	it('Error by rate limit', async () => {
		const promises = []

		for (let i = 0; i <= 100; i++) {
			const response = supertest(server)
				.post('/dish/6646d1e8a418409f0fa75a86/rate')
				.set('Authorization', 'Bearer token')
				.send(RateMock)

			promises.push(response)
		}

		const responses = await Promise.all(promises)

		expect(responses[99].statusCode).toBe(200)
		expect(responses[99].body).toEqual(ResponseRateSuccessMock)

		expect(responses[100].statusCode).toBe(429)
		expect(responses[100].body).toEqual(ResponseErrorTooManyRatesMock)
	})
})
