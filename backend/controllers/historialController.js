const db = require('../config/database');

exports.obtenerHistorial = (req, res) => {
    const { paciente_id } = req.params;
    const sql = `SELECT h.*, u.nombre AS doctor_nombre 
                 FROM historial_clinico h
                 INNER JOIN usuarios u ON h.doctor_id = u.id
                 WHERE h.paciente_id = ?
                 ORDER BY h.fecha DESC`;
    db.query(sql, [paciente_id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.crearHistorial = (req, res) => {
    const { paciente_id } = req.params;
    const { doctor_id, fecha, diagnostico, tratamiento, observaciones, odontograma } = req.body;

    if (!doctor_id || !fecha || !diagnostico || !tratamiento)
        return res.status(400).json({ error: 'Doctor, fecha, diagnóstico y tratamiento son obligatorios' });

    const sql = `INSERT INTO historial_clinico 
                 (paciente_id, doctor_id, fecha, diagnostico, tratamiento, observaciones, odontograma) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [paciente_id, doctor_id, fecha, diagnostico, tratamiento, observaciones, JSON.stringify(odontograma || {})], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Registro creado', id: result.insertId });
    });
};

exports.eliminarHistorial = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM historial_clinico WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Registro eliminado' });
    });
};

exports.actualizarHistorial = (req, res) => {
    const { id } = req.params;
    const { doctor_id, fecha, diagnostico, tratamiento, observaciones, odontograma } = req.body;
    const sql = `UPDATE historial_clinico 
                 SET doctor_id=?, fecha=?, diagnostico=?, tratamiento=?, observaciones=?, odontograma=?
                 WHERE id=?`;
    db.query(sql, [doctor_id, fecha, diagnostico, tratamiento, observaciones, JSON.stringify(odontograma), id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Registro actualizado' });
    });
};