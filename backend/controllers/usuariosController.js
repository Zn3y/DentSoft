const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mi_clave_secreta_super_segura';

exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ error: 'Todos los campos son obligatorios' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)`;

    db.query(sql, [nombre, email, hashedPassword, rol || 'asistente'], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Usuario registrado correctamente', id: result.insertId });
    });
};

exports.loginUsuario = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son obligatorios' });

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        const usuario = results[0];
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }, SECRET_KEY, { expiresIn: '8h' });
        res.json({ mensaje: 'Login exitoso', token });
    });
};

exports.obtenerDoctores = (req, res) => {
    const sql = "SELECT id, nombre FROM usuarios WHERE rol = 'doctor'";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.obtenerTodos = (req, res) => {
    const sql = "SELECT id, nombre, email, rol, created_at FROM usuarios";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.eliminarUsuario = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Usuario eliminado' });
    });
};

exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password, rol } = req.body;

    let sql, params;

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        sql = 'UPDATE usuarios SET nombre=?, email=?, password=?, rol=? WHERE id=?';
        params = [nombre, email, hashedPassword, rol, id];
    } else {
        sql = 'UPDATE usuarios SET nombre=?, email=?, rol=? WHERE id=?';
        params = [nombre, email, rol, id];
    }

    db.query(sql, params, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Usuario actualizado' });
    });
};