export const ResponseRateSuccessMock = {
	data: {
		comments: 'This is a description',
		stars: 4,
		userId: 'user123',
	},
	message: 'Rate dish successful',
	success: true,
}

export const ResponseErrorTooManyRatesMock = {
	success: false,
	message: 'Too many requests, please try again later',
}
