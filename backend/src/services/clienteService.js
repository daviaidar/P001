const { poolPromise, mssql } = require('./db');

class ClienteService {
    async getAll() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM clientes ORDER BY nome ASC');
        return result.recordset;
    }

    async create(data) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('nome', mssql.NVarChar, data.nome)
            .input('telefone', mssql.NVarChar, data.telefone)
            .input('instagram', mssql.NVarChar, data.instagram)
            .query(`
                INSERT INTO clientes (nome, telefone, instagram)
                VALUES (@nome, @telefone, @instagram);
                SELECT SCOPE_IDENTITY() as id;
            `);
        return result.recordset[0];
    }
}

module.exports = new ClienteService();
