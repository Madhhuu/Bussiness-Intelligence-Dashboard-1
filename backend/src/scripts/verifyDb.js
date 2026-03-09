const pool = require('../config/db');

const verifyDb = async () => {
    try {
        const connection = await pool.getConnection();
        const [tables] = await connection.execute('SHOW TABLES');
        const tableNames = tables.map(t => Object.values(t)[0]);

        const [salesDesc] = await connection.execute('DESCRIBE sales');
        const [salesCount] = await connection.execute('SELECT COUNT(*) as count FROM sales');

        console.log(JSON.stringify({
            tables: tableNames,
            salesStructure: salesDesc,
            salesCount: salesCount[0].count
        }, null, 2));

        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('JSON Verification Failed:', error);
        process.exit(1);
    }
};

verifyDb();
