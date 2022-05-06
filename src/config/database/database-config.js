import mariadb from 'mariadb'

const params  = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5
}

export const pool = mariadb.createPool(params);

