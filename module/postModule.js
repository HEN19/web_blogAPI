const mysql = require('../helper/database')

const Joi = require('joi')

class _post {
    listPost = async() => {
        try {
            const list = await mysql.query(
                'SELECT * FROM d_posts',
                []
            )

            return {
                status: true,
                data:list
            }
            
        } catch (error) {
            console.error('listPost post module Error:', error)

            return{
                status:false,
                error
            }
            
        }
    }
}