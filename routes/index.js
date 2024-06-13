const Router = require("express")
const router = new Router()

const sklad = require('./skladRoutes')
const prodaji = require('./prodajiRoutes')
const tovar = require('./tovarRoutes')
const user = require('./userRoutes')

router.use('/sklad',require('./skladRoutes'))
router.use('/prodaji',require('./prodajiRoutes'))
router.use('/tovar',require('./tovarRoutes'))
router.use('/user',require('./userRoutes'))

module.exports=router