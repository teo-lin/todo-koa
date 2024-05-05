const Koa = require('koa')
const koaBody = require('koa-body').default
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

const PATH = path.join(__dirname, './db.json')
const PORT = 3333

// CONTROLLERS
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
			ctx.body = { message: error.message }
		}
	}

	static async deleteUser(ctx) {
		try {
			await UserService.deleteUser(ctx.params.id)
			ctx.body = { message: 'User deleted successfully' }
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}
}
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
class ListController {
	static async createList(ctx) {
		try {
			const newList = await ListService.createList(ctx.request.body)
			ctx.status = 201
			ctx.body = newList
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async retrieveList(ctx) {
		try {
			const list = await ListService.retrieveList(ctx.params.id)
			if (!list) ctx.throw(404, 'List not found')
			ctx.body = list
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async updateList(ctx) {
		try {
			const updatedList = await ListService.updateList(
				ctx.params.id,
				ctx.request.body
			)
			ctx.body = updatedList
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}

	static async deleteList(ctx) {
		try {
			await ListService.deleteList(ctx.params.id)
			ctx.body = { message: 'List deleted successfully' }
		} catch (error) {
			ctx.status = 500
			ctx.body = { message: error.message }
		}
	}
}

// SERVICES
class UserService {
	static async createUser(userData) {
		const usersData = DatabaseService.getData(PATH)
		const nextUserId = `U${1 + Number(usersData.lastUserId.slice(1))}`
		const newUser = { userId: nextUserId, ...userData }
		usersData.users.push(newUser)
		usersData.lastUserId = nextUserId
		DatabaseService.setData(PATH, usersData)
		delete newUser.passWord
		return newUser
	}

	static async retrieveUser(userId) {
		const usersData = DatabaseService.getData(PATH)
		const user = usersData.users.find((user) => user.userId === userId)
		delete user.passWord
		return user
	}

	static async updateUser(userId, userData) {
		const usersData = DatabaseService.getData(PATH)
		const userIndex = usersData.users.findIndex(
			(user) => user.userId === userId
		)
		if (userIndex === -1) throw new Error('User not found')
		usersData.users[userIndex] = { ...usersData.users[userIndex], ...userData }
		DatabaseService.setData(PATH, usersData)
		const user = usersData.users[userIndex]
		delete user.passWord
		return user
	}

	static async deleteUser(userId) {
		const usersData = DatabaseService.getData(PATH)
		usersData.users = usersData.users.filter((user) => user.userId !== userId)
		DatabaseService.setData(PATH, usersData)
	}
}
class ListService {
	static async createList(listData) {
		const listsData = DatabaseService.getData(PATH)
		const nextListId = `L${1 + Number(listsData.lastListId.slice(1))}`
		const newList = { listId: nextListId, ...listData }
		listsData.lists.push(newList)
		listsData.lastListId = nextListId
		DatabaseService.setData(PATH, listsData)
		return newList
	}

	static async retrieveList(listId) {
		const listsData = DatabaseService.getData(PATH)
		return listsData.lists.find((list) => list.listId === listId)
	}

	static async updateList(listId, listData) {
		const listsData = DatabaseService.getData(PATH)
		const listIndex = listsData.lists.findIndex(
			(list) => list.listId === listId
		)
		if (listIndex === -1) throw new Error('List not found')
		listsData.lists[listIndex] = { ...listsData.lists[listIndex], ...listData }
		DatabaseService.setData(PATH, listsData)
		return listsData.lists[listIndex]
	}

	static async deleteList(listId) {
		const listsData = DatabaseService.getData(PATH)
		listsData.lists = listsData.lists.filter((list) => list.listId !== listId)
		DatabaseService.setData(PATH, listsData)
	}
}
class TaskService {
	static async createTask(taskData) {
		const tasksData = DatabaseService.getData(PATH)
		const nextTaskId = `T${1 + Number(tasksData.lastTaskId.slice(1))}`
		const newTask = { taskId: nextTaskId, ...taskData }
		tasksData.tasks.push(newTask)
		tasksData.lastTaskId = nextTaskId
		DatabaseService.setData(PATH, tasksData)
		return newTask
	}

	static async retrieveTask(taskId) {
		const tasksData = DatabaseService.getData(PATH)
		return tasksData.tasks.find((task) => task.taskId === taskId)
	}

	static async updateTask(taskId, taskData) {
		const tasksData = DatabaseService.getData(PATH)
		const taskIndex = tasksData.tasks.findIndex(
			(task) => task.taskId === taskId
		)
		if (taskIndex === -1) throw new Error('Task not found')
		tasksData.tasks[taskIndex] = { ...tasksData.tasks[taskIndex], ...taskData }
		DatabaseService.setData(PATH, tasksData)
		return tasksData.tasks[taskIndex]
	}

	static async deleteTask(taskId) {
		const tasksData = DatabaseService.getData(PATH)
		tasksData.tasks = tasksData.tasks.filter((task) => task.taskId !== taskId)
		DatabaseService.setData(PATH, tasksData)
	}

	static async completeTask(taskId) {
		const tasksData = DatabaseService.getData(PATH)
		const taskIndex = tasksData.tasks.findIndex(
			(task) => task.taskId === taskId
		)
		if (taskIndex === -1) throw new Error('Task not found')
		tasksData.tasks[taskIndex].isComplete = true
		DatabaseService.setData(PATH, tasksData)
		return tasksData.tasks[taskIndex]
	}
}

class DatabaseService {
	static getData(filePath) {
		return JSON.parse(fs.readFileSync(filePath, 'utf8'))
	}
	static setData(filePath, data) {
		fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
	}
}

// ROUTER
const app = new Koa()
const router = new Router()

// MIDDLEWARE
app.use(koaBody())
app.use(router.routes())

// ROUTES
router.post('/users/register', UserController.createUser)
router.get('/users/user/:id', UserController.retrieveUser)
router.put('/users/user/:id', UserController.updateUser)
router.delete('/users/user/:id', UserController.deleteUser)
router.post('/tasks/create', TaskController.createTask)
router.get('/tasks/task/:id', TaskController.retrieveTask)
router.put('/tasks/task/:id', TaskController.updateTask)
router.delete('/tasks/task/:id', TaskController.deleteTask)
router.patch('/tasks/task/:id/complete', TaskController.completeTask)
router.post('/lists/create', ListController.createList)
router.get('/lists/list/:id', ListController.retrieveList)
router.put('/lists/list/:id', ListController.updateList)
router.delete('/lists/list/:id', ListController.deleteList)

// SERVER
app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}`)
)
