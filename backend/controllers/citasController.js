const db = require('../config/database');

exports.obtenerCitas = (req, res) => {
    const sql = `SELECT citas.*, 
                 pacientes.nombre, pacientes.apellido,
                 usuarios.nombre AS doctor_nombre
                 FROM citas 
                 INNER JOIN pacientes ON citas.paciente_id = pacientes.id
                 INNER JOIN usuarios ON citas.doctor_id = usuarios.id`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.crearCita = (req, res) => {
    const { paciente_id, fecha, hora, motivo, doctor_id } = req.body;
    if (!paciente_id || !fecha || !hora || !doctor_id) 
        return res.status(400).json({ error: 'Paciente, fecha, hora y doctor son obligatorios' });

    const sql = 'INSERT INTO citas (paciente_id, fecha, hora, motivo, doctor_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [paciente_id, fecha, hora, motivo, doctor_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Cita creada', id: result.insertId });
    });
};

exports.actualizarCita = (req, res) => {
    const { id } = req.params;
    const { fecha, hora, motivo, estado } = req.body;
    const sql = 'UPDATE citas SET fecha=?, hora=?, motivo=?, estado=? WHERE id=?';
    db.query(sql, [fecha, hora, motivo, estado, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Cita actualizada' });
    });
};

exports.eliminarCita = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM citas WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Cita eliminada' });
    });
};
