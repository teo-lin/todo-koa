const Router = require('@koa/router')
const ListService = require('./list.service')

class ListController {
  static createList(ctx) {
    try {
      const newList = ListService.createList(ctx.request.body)
      ctx.status = 201
      ctx.body = newList
    } catch (error) {
      ctx.status = 500
      ctx.body = { message: error.message }
    }
  }

  static retrieveList(ctx) {
    try {
      const list = ListService.retrieveList(ctx.params.id)
      if (!list) ctx.throw(404, 'List not found')
      ctx.body = list
    } catch (error) {
      ctx.status = 500
      ctx.body = { message: error.message }
    }
  }

  static updateList(ctx) {
    try {
      const updatedList = ListService.updateList(ctx.params.id, ctx.request.body)
      ctx.body = updatedList
    } catch (error) {
      ctx.status = 500
      ctx.body = { message: error.message }
    }
  }

  static deleteList(ctx) {
    try {
      ListService.deleteList(ctx.params.id)
      ctx.body = { message: 'List deleted successfully' }
    } catch (error) {
      ctx.status = 500
      ctx.body = { message: error.message }
    }
  }
}

const listRouter = new Router({ prefix: '/api/lists' })
listRouter.post('/create', ListController.createList)
listRouter.get('/list/:id', ListController.retrieveList)
listRouter.put('/list/:id', ListController.updateList)
listRouter.delete('/list/:id', ListController.deleteList)

module.exports = listRouter