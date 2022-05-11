import mariadb from 'mariadb'

const params  = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 1
}


export const pool = mariadb.createPool(params);

