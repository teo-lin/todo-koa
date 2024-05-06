const Router = require('@koa/router')
const TaskService = require('./task.service')

class TaskController {
	static async createTask(ctx) {
		try {
			const newTask = await TaskService.createTask(ctx.request.body)
			ctx.status = 201
			ctx.body = newTask
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async retrieveTask(ctx) {
		try {
			const task = await TaskService.retrieveTask(ctx.params.id)
			if (!task) ctx.throw(404, 'Task not found')
			ctx.body = task
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async updateTask(ctx) {
		try {
			const updatedTask = await TaskService.updateTask(
				ctx.params.id,
				ctx.request.body
			)
			ctx.body = updatedTask
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async deleteTask(ctx) {
		try {
			await TaskService.deleteTask(ctx.params.id)
			ctx.body = { message: 'Task deleted successfully' }
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async completeTask(ctx) {
		try {
			const taskId = ctx.params.id
			const task = await TaskService.completeTask(taskId)
			if (!task) ctx.throw(404, 'Task not found')
			ctx.body = task
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}
}

const taskRouter = new Router({ prefix: '/tasks' })
taskRouter.post('/create', TaskController.createTask)
taskRouter.get('/task/:id', TaskController.retrieveTask)
taskRouter.put('/task/:id', TaskController.updateTask)
taskRouter.delete('/task/:id', TaskController.deleteTask)
taskRouter.patch('/task/:id/complete', TaskController.completeTask)

module.exports = taskRouter
