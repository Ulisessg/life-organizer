import { createPool } from 'mariadb'

const pool = createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, port: Number(process.env.DB_PORT) || 3306 })

export async function query<T>(query: string, values: unknown[]): Promise<T> {
    let connection;
    try {
        connection = await pool.getConnection()
        const result: T = await connection.query(query, values)
        return result
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        if (connection)
            await connection.end()
    }
}
