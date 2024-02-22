const pool=require('../mySql')

module.exports={
  create:(data,callback)=>{
    pool.query(`INSERT INTO  user_signup_table (username, email, phone_Number, password) VALUES (?, ?, ?, ?)`,
     [data.username, data.email, data.phone_number, data.password],
     (error,result,field)=>{
       if(error){
          return callback(error)
        }
        return callback(null,result)
      }
      )
  },
  login: (data, callback) => {
    pool.query('SELECT * FROM user_signup_table WHERE email= ?',
      [data.email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null,results)
      
      }
    );
  },
}