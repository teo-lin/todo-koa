import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import userRouter from './modules/user/user.controller'
import taskRouter from './modules/task/task.controller'
import listRouter from './modules/list/list.controller'
import DatabaseService from './modules/database/database.service'

const startTime = process.hrtime()

// DATABASE
DatabaseService.init()

// ROUTER
const app: Koa = new Koa()

// MIDDLEWARE
app.use(bodyParser())

// ROUTES
app.use(userRouter.routes())
app.use(taskRouter.routes())
app.use(listRouter.routes())
app.use(async (ctx, next) => {
  if (ctx.path === '/api') ctx.body = 'Hello World!'
  else await next()
})

// SERVER
const PORT = 3000
const endTime = process.hrtime(startTime)
const startupTime = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3)
app.listen(PORT, () =>
  console.log(`Server started in ${startupTime} ms on http://localhost:${PORT}`)
)
