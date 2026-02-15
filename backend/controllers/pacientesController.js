const db = require('../config/database');

exports.obtenerPacientes = (req, res) => {
    db.query('SELECT * FROM pacientes', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.crearPaciente = (req, res) => {
    const { nombre, apellido, telefono, email } = req.body;
    if (!nombre || !apellido) return res.status(400).json({ error: 'Nombre y apellido obligatorios' });

    const sql = 'INSERT INTO pacientes (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, telefono, email], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Paciente creado', id: result.insertId });
    });
};

exports.actualizarPaciente = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email } = req.body;
    const sql = 'UPDATE pacientes SET nombre=?, apellido=?, telefono=?, email=? WHERE id=?';
    db.query(sql, [nombre, apellido, telefono, email, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Paciente actualizado' });
    });
};

exports.eliminarPaciente = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pacientes WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Paciente eliminado' });
    });
};
