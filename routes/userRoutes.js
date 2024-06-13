const Router = require("express")
const router = new Router()

const user = require('../queries/user.js')
router.post('/auth', user.auth)
router.post('/reg', user.reg)
router.get('/get:id',user.get)
router.delete('/delete:id',user.destroy)


module.exports=router

