import { DishController } from '../dish/dish.controller'
import { HandlerRouter } from '../core/http'

const router = new HandlerRouter()
const dishController = new DishController()

router.addRoute('GET', '/dish', dishController.getAll.bind(dishController))
router.addRoute(
	'GET',
	'/dish/:id',
	dishController.getDishDetails.bind(dishController)
)

router.addRoute('POST', '/dish', dishController.create.bind(dishController))

router.addRoute(
	'PATCH',
	'/dish/:id',
	dishController.update.bind(dishController)
)

router.addRoute(
	'DELETE',
	'/dish/:id',
	dishController.delete.bind(dishController)
)

export default router
