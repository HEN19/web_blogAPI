const mysql = require ('../helper/database')

const Joi = require('joi')

class _user {
    addUser =  async(body) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
                
            })

            const validation = schema.validate(body)

            if (validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
            
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await mysql.query(
                'INSET INTO auth_user (username, email, password) VALUES (?,?,?)',
                [body.username, body.email, body.password]
            )
            return {
                status:true,
                data: add
            }
        } catch (error) {
            console.error('addUser user module Error: ', error)

            return {
                status:false,
                error
            }
            
        }
    }

    editDataUser = async (body) => {
        try {
            const schema = Joi.object({
                id: Joi.number().required(),
                username : Joi.string().required(),
                password : Joi.string()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const edit = await mysql.query(
                'UPDATE auth_user SET password = ? WHILE id =?, username = ?'
            )

            return {
                status:true,
                data:edit
            }
        } catch (error) {
            console.error('editDataUser user module Error: ', error)

            return {
                status:false,
                error
            }
            
        }
    }
}
module.exports = new _user()