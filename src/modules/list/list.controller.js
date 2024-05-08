const Router = require('@koa/router');
const ListService = require('./list.service');

class ListController {
  static async createList(ctx) {
    try {
      const newList = await ListService.createList(ctx.request.body);
      ctx.status = 201;
      ctx.body = newList;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: error.message };
    }
  }

  static async retrieveList(ctx) {
    try {
      const list = await ListService.retrieveList(ctx.params.id);
      if (!list) ctx.throw(404, 'List not found');
      ctx.body = list;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: error.message };
    }
  }

  static async updateList(ctx) {
    try {
      const updatedList = await ListService.updateList(ctx.params.id, ctx.request.body);
      ctx.body = updatedList;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: error.message };
    }
  }

  static async deleteList(ctx) {
    try {
      await ListService.deleteList(ctx.params.id);
      ctx.body = { message: 'List deleted successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: error.message };
    }
  }
}

const listRouter = new Router({ prefix: '/lists' });
listRouter.post('/create', ListController.createList);
listRouter.get('/list/:id', ListController.retrieveList);
listRouter.put('/list/:id', ListController.updateList);
listRouter.delete('/list/:id', ListController.deleteList);

module.exports = listRouter;
