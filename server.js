const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// bcrypt ya no se usa
const path = require('path');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const SECRET = process.env.JWT_SECRET || 'secreto_local';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});


function auth(req, res, next) {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    const token = header.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }
        req.user = decoded;
        next();
    });
}


function requireRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ error: 'No autorizado' });
        }
        next();
    };
}


app.post('/api/login', (req, res) => {

    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    connection.query(
        'SELECT * FROM usuarios WHERE usuario = ?',
        [usuario],
        (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error en servidor' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }

            const user = results[0];

            
            if (password !== user.password) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    usuario: user.usuario,
                    rol: user.rol
                },
                SECRET,
                { expiresIn: '1h' }
            );

            // Devolvemos token y datos del usuario
            res.json({
                token,
                usuario: user.usuario,
                rol: user.rol
            });
        }
    );
});


// GET PROYECTOS (CON FILTROS)

app.get('/api/proyectos', auth, requireRole('admin'), (req, res) => {

    const { fecha, nombre, prioridad } = req.query;

    let query = 'SELECT * FROM proyectos WHERE 1=1';
    const params = [];

    if (fecha) {
        query += ' AND fecha = ?';
        params.push(fecha);
    }

    if (nombre) {
        query += ' AND nombre LIKE ?';
        params.push(`%${nombre}%`);
    }

    if (prioridad) {
        query += ' AND prioridad = ?';
        params.push(prioridad);
    }

    query += ' ORDER BY fecha DESC';

    connection.query(query, params, (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener proyectos' });
        }

        res.json(results);
    });
});


app.post('/api/proyectos', auth, requireRole('admin'), (req, res) => {

    const { nombre, descripcion, fecha, prioridad } = req.body;

    if (!nombre || !fecha || !prioridad) {
        return res.status(400).json({ error: 'Campos obligatorios faltantes' });
    }

    const prioridadesValidas = ['baja', 'media', 'alta'];

    if (!prioridadesValidas.includes(prioridad)) {
        return res.status(400).json({ error: 'Prioridad inválida' });
    }

    const query = `
        INSERT INTO proyectos (nombre, descripcion, fecha, prioridad)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(
        query,
        [nombre, descripcion, fecha, prioridad],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al crear proyecto' });
            }

            res.json({
                mensaje: 'Proyecto creado',
                id: result.insertId
            });
        }
    );
});


app.put('/api/proyectos/:id', auth, requireRole('admin'), (req, res) => {

    const { id } = req.params;
    const { nombre, descripcion, fecha, prioridad } = req.body;

    const query = `
        UPDATE proyectos
        SET nombre = ?, descripcion = ?, fecha = ?, prioridad = ?
        WHERE id = ?
    `;

    connection.query(
        query,
        [nombre, descripcion, fecha, prioridad, id],
        (err) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al actualizar' });
            }

            res.json({ mensaje: 'Proyecto actualizado' });
        }
    );
});


app.delete('/api/proyectos/:id', auth, requireRole('admin'), (req, res) => {

    const { id } = req.params;

    connection.query(
        'DELETE FROM proyectos WHERE id = ?',
        [id],
        (err) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al eliminar' });
            }

            res.json({ mensaje: 'Proyecto eliminado' });
        }
    );
});


app.get('/api/test', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente' });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});