const db = require('../config/database');

exports.obtenerEstadisticas = (req, res) => {
    const sqlPacientes = 'SELECT COUNT(*) AS totalPacientes FROM pacientes';
    const sqlCitasHoy = "SELECT COUNT(*) AS citasHoy FROM citas WHERE fecha = CURDATE()";
    const sqlCitasProximas = "SELECT COUNT(*) AS citasProximas FROM citas WHERE fecha > CURDATE()";

    db.query(sqlPacientes, (err, resultPacientes) => {
        if (err) return res.status(500).json(err);

        db.query(sqlCitasHoy, (err, resultCitasHoy) => {
            if (err) return res.status(500).json(err);

            db.query(sqlCitasProximas, (err, resultCitasProximas) => {
                if (err) return res.status(500).json(err);

                res.json({
                    totalPacientes: resultPacientes[0].totalPacientes,
                    citasHoy: resultCitasHoy[0].citasHoy,
                    citasProximas: resultCitasProximas[0].citasProximas
                });
            });
        });
    });
};

exports.estadisticasGraficos = (req, res) => {
    const sqlCitasMes = `
      SELECT MONTH(fecha) AS mes, COUNT(*) AS total
      FROM citas
      GROUP BY MONTH(fecha)
    `
    const sqlCitasEstado = `
      SELECT estado, COUNT(*) AS total
      FROM citas
      GROUP BY estado
    `

    db.query(sqlCitasMes, (err, resultMes) => {
        if (err) return res.status(500).json(err)
        db.query(sqlCitasEstado, (err, resultEstado) => {
            if (err) return res.status(500).json(err)
            res.json({ citasMes: resultMes, citasEstado: resultEstado })
        })
    })
}
