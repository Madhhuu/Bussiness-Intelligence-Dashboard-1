const pool = require('../config/db');

class User {
    static async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(userData) {
        const { username, email, password_hash, role } = userData;
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [username, email, password_hash, role]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, userData) {
        const { username, email } = userData;
        await pool.execute(
            'UPDATE users SET username = ?, email = ? WHERE id = ?',
            [username, email, id]
        );
        return true;
    }

    static async updatePassword(id, hashedPassword) {
        await pool.execute(
            'UPDATE users SET password_hash = ? WHERE id = ?',
            [hashedPassword, id]
        );
        return true;
    }
}

module.exports = User;
