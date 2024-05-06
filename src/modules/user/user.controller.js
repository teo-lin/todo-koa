const Router = require('koa-router')
const UserService = require('./user.service')

class UserController {
	static async createUser(ctx) {
		try {
			const newUser = await UserService.createUser(ctx.request.body)
			ctx.status = 201
			ctx.body = newUser
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async retrieveUser(ctx) {
		try {
			const user = await UserService.retrieveUser(ctx.params.id)
			if (!user) ctx.throw(404, 'User not found')
			ctx.body = user
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async updateUser(ctx) {
		try {
			const updatedUser = await UserService.updateUser(
				ctx.params.id,
				ctx.request.body
			)
						ctx.body = updatedUser
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }		}
	}

	static async deleteUser(ctx) {
		try {
			await UserService.deleteUser(ctx.params.id)
			ctx.body = { message: 'List deleted successfully' }
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }		}
	}
}

const userRouter = new Router({ prefix: '/users' })
userRouter.post('/register', UserController.createUser)
userRouter.get('/user/:id', UserController.retrieveUser)
userRouter.put('/user/:id', UserController.updateUser)
userRouter.delete('/user/:id', UserController.deleteUser)

module.exports = userRouter
