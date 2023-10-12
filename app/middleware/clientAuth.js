const seqelize = require('sequelize')

const db = require('../../config/database')
const loginModel = db.loginModel






exports.login = async (req, res, next) => {
    try {
        
        // console.log("this is middleware ", req.session)
        if (req.session.user) {
            console.log('this is middleware req.session',req.session.user.role)
           
             if (req.session.user.role=="Client"){
                if(req.session.user.role!="Client"){
                    return res.redirect('/')
                }
                console.log('this is a client')
                next()

                // return res.redirect('/m_admin/admin')
            }else{
                console.log('here nobody mention this ')
                return res.redirect('/')

            }
            // next()
        }
        else {
            console.log('only client can view this')
            // next()
            return res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }
}
