const seqelize = require('sequelize')

const db = require('../../config/database')
const loginModel = db.loginModel




exports.isUser = async (req, res, next) => {
    try {
        console.log("this is middleware ", req.session.user)
        if (req.session.user) {
            console.log('this is middleware req.session',req.session.user.role)
            if(req.session.user.role=="Super Admin"){
                console.log('this is super admin')
                return res.redirect('/admin/admindashboard')
            }
            else if (req.session.user.role=="Admin"){
                console.log('this is a admin')
                return res.redirect('/m_admin/admin')
            }else if(req.session.user.role=='Client'){
                console.log('This is a Client')
                return res.redirect('/client/client')
            }else if(req.session.user.role=='Candidate'){
                console.log('This is a Candidate')
                return res.redirect('/candidate/candidate')
            }else{
                console.log('here nobody mention this ')
            }
            // next()
        }
        else {
            return res.redirect('/login')
            console.log('middleware not used')

            next()
        }
    } catch (error) {
        console.log(error)
    }
}


exports.login = async (req, res, next) => {
    try {
        
        // console.log("this is middleware ", req.session)
        if (req.session.user) {
            console.log('this is middleware req.session',req.session.user.role)
            if(req.session.user.role=="Super Admin"){
                console.log('this is super admin')
                next()
                // return res.redirect('/admin/admindashboard')
            }
            else if (req.session.user.role=="Admin"){
                console.log('this is a admin')
                next()

                // return res.redirect('/m_admin/admin')
            }else if(req.session.user.role=='Client'){
                console.log('This is a Client')
                next()

                // return res.redirect('/client/client')
            }else if(req.session.user.role=='Candidate'){
                console.log('This is a Candidate')
                next()

                // return res.redirect('/candidate/candidate')
            }else{
                console.log('here nobody mention this ')
                next()

            }
            // next()
        }
        else {
            console.log('middleware not used')
            // next()
            return res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }
}
