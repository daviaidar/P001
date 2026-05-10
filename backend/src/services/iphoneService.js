const { poolPromise, mssql } = require('./db');

class iPhoneService {
    async getAll() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM iphones ORDER BY id DESC');
        return result.recordset;
    }

    async getById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', mssql.Int, id)
            .query('SELECT * FROM iphones WHERE id = @id');
        return result.recordset[0];
    }

    async create(data) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('modelo', mssql.NVarChar, data.modelo)
            .input('armazenamento', mssql.NVarChar, data.armazenamento)
            .input('cor', mssql.NVarChar, data.cor)
            .input('estado', mssql.NVarChar, data.estado)
            .input('saude_bateria', mssql.Int, data.saude_bateria)
            .input('data_compra', mssql.Date, data.data_compra)
            .input('valor_compra', mssql.Decimal(10, 2), data.valor_compra)
            .input('status', mssql.NVarChar, data.status || 'Em estoque')
            .input('observacoes', mssql.NVarChar, data.observacoes)
            .query(`
                INSERT INTO iphones (modelo, armazenamento, cor, estado, saude_bateria, data_compra, valor_compra, status, observacoes)
                VALUES (@modelo, @armazenamento, @cor, @estado, @saude_bateria, @data_compra, @valor_compra, @status, @observacoes);
                SELECT SCOPE_IDENTITY() as id;
            `);
        return result.recordset[0];
    }

    async update(id, data) {
        const pool = await poolPromise;
        await pool.request()
            .input('id', mssql.Int, id)
            .input('modelo', mssql.NVarChar, data.modelo)
            .input('armazenamento', mssql.NVarChar, data.armazenamento)
            .input('cor', mssql.NVarChar, data.cor)
            .input('estado', mssql.NVarChar, data.estado)
            .input('saude_bateria', mssql.Int, data.saude_bateria)
            .input('data_compra', mssql.Date, data.data_compra)
            .input('valor_compra', mssql.Decimal(10, 2), data.valor_compra)
            .input('data_venda', mssql.Date, data.data_venda)
            .input('valor_venda', mssql.Decimal(10, 2), data.valor_venda)
            .input('status', mssql.NVarChar, data.status)
            .input('origem_venda', mssql.NVarChar, data.origem_venda)
            .input('cliente_id', mssql.Int, data.cliente_id)
            .input('observacoes', mssql.NVarChar, data.observacoes)
            .query(`
                UPDATE iphones SET 
                    modelo = @modelo, 
                    armazenamento = @armazenamento, 
                    cor = @cor, 
                    estado = @estado, 
                    saude_bateria = @saude_bateria, 
                    data_compra = @data_compra, 
                    valor_compra = @valor_compra, 
                    data_venda = @data_venda, 
                    valor_venda = @valor_venda, 
                    status = @status, 
                    origem_venda = @origem_venda, 
                    cliente_id = @cliente_id, 
                    observacoes = @observacoes
                WHERE id = @id
            `);
        return { success: true };
    }

    async delete(id) {
        const pool = await poolPromise;
        await pool.request()
            .input('id', mssql.Int, id)
            .query('DELETE FROM iphones WHERE id = @id');
        return { success: true };
    }
}

module.exports = new iPhoneService();
