const Koa = require('koa')
const { bodyParser } = require('@koa/bodyparser')
const userRouter = require('./modules/user/user.controller')
const taskRouter = require('./modules/task/task.controller')
const listRouter = require('./modules/list/list.controller')
const DatabaseService = require('./modules/database/database.service')

// ROUTER
const app = new Koa()
const PORT = 3000

// MIDDLEWARE
app.use(bodyParser())
app.use(async (ctx) => {
  ctx.status = 404
  ctx.body = { message: 'Route not found' }
})

// ROUTES
app.use(userRouter.routes())
app.use(taskRouter.routes())
app.use(listRouter.routes())

// SERVER
DatabaseService.init()
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
