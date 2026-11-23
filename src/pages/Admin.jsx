
import { useState, useEffect } from 'react';
import { equipo as respaldo } from '../config';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Admin() {
  const [devs, setDevs] = useState([]);
  const [pqrs, setPqrs] = useState([]);

  const [fuente, setFuente] = useState('Conectando...');
  const [error, setError] = useState('');

  const [editando, setEditando] = useState(null);
  const [formDev, setFormDev] = useState({
    name: '',
    role: '',
    phone: ''
  });

  const [editandoPqr, setEditandoPqr] = useState(null);
  const [formPqr, setFormPqr] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [cargando, setCargando] = useState(false);

  // =================================
  // CONSULTAR INFORMACIÓN
  // =================================

  const cargarDatos = async () => {
    try {
      const [resDev, resPqr] = await Promise.all([
        fetch(`${API}/api/developers`),
        fetch(`${API}/api/pqrs`)
      ]);

      if (!resDev.ok || !resPqr.ok) {
        throw new Error('No se pudieron consultar los datos');
      }

      const datosDev = await resDev.json();
      const datosPqr = await resPqr.json();

      setDevs(datosDev);
      setPqrs(datosPqr);
      setFuente('API Express conectada');
      setError('');

    } catch (err) {
      setDevs(respaldo);
      setFuente('Sin conexión con el backend');
      setError('No fue posible cargar las PQR ni conectar con Express.');
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // =================================
  // DESARROLLADORES
  // =================================

  const guardarDev = async (e) => {
    e.preventDefault();

    if (!formDev.name.trim() || !formDev.role.trim()) {
      alert('El nombre y el cargo son obligatorios.');
      return;
    }

    setCargando(true);

    try {
      const url = editando
        ? `${API}/api/developers/${editando}`
        : `${API}/api/developers`;

      const response = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDev)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo guardar');
      }

      setFormDev({ name: '', role: '', phone: '' });
      setEditando(null);

      await cargarDatos();

      alert('Desarrollador guardado correctamente.');

    } catch (err) {
      alert(err.message);
    } finally {
      setCargando(false);
    }
  };

  const prepararEdicion = (dev) => {
    setEditando(dev.id);

    setFormDev({
      name: dev.name,
      role: dev.role,
      phone: dev.phone || ''
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eliminarDev = async (id) => {
    if (!window.confirm('¿Deseas eliminar este desarrollador?')) return;

    try {
      const response = await fetch(`${API}/api/developers/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      await cargarDatos();
      alert('Desarrollador eliminado.');

    } catch (err) {
      alert(err.message || 'No fue posible eliminarlo.');
    }
  };

  // =================================
  // GESTIÓN DE PQR
  // =================================

  const guardarPqr = async (e) => {
    e.preventDefault();

    setCargando(true);

    try {
      const url = editandoPqr
        ? `${API}/api/pqrs/${editandoPqr}`
        : `${API}/api/pqrs`;

      const response = await fetch(url, {
        method: editandoPqr ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formPqr)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo guardar la PQR');
      }

      setFormPqr({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      });

      setEditandoPqr(null);

      await cargarDatos();

      alert('PQR actualizada correctamente.');

    } catch (err) {
      alert(err.message);
    } finally {
      setCargando(false);
    }
  };

  const prepararEdicionPqr = (pqr) => {
    setEditandoPqr(pqr.id);

    setFormPqr({
      nombre: pqr.nombre,
      email: pqr.email,
      telefono: pqr.telefono,
      mensaje: pqr.mensaje
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eliminarPqr = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta solicitud PQR?')) return;

    try {
      const response = await fetch(`${API}/api/pqrs/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      await cargarDatos();
      alert('PQR eliminada correctamente.');

    } catch (err) {
      alert(err.message || 'No fue posible eliminar la PQR.');
    }
  };

  return (
    <section
      className="section"
      style={{ maxWidth: 1100, margin: '0 auto' }}
    >

      <h2 className="section-title">
        Panel administrativo
      </h2>

      <p className="section-sub">
        Gestión del equipo de desarrollo y solicitudes PQR de Koralyx Technologies.
      </p>

      <p className="source">
        Estado: {fuente}
      </p>

      {error && (
        <p role="alert" style={{ color: '#d62828' }}>
          {error}
        </p>
      )}

      <button
        type="button"
        className="btn-gradient"
        onClick={cargarDatos}
      >
        Actualizar información
      </button>

      {/* ================================= */}
      {/* FORMULARIO DE DESARROLLADORES */}
      {/* ================================= */}

      <div className="panel" style={{ marginTop: 30 }}>
        <h3>
          {editando ? 'Editar integrante' : 'Registrar integrante'}
        </h3>

        <form onSubmit={guardarDev} className="form">

          <div className="field">
            <label htmlFor="devName">Nombre completo</label>
            <input
              id="devName"
              type="text"
              value={formDev.name}
              onChange={(e) =>
                setFormDev({ ...formDev, name: e.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <label htmlFor="devRole">Cargo</label>
            <input
              id="devRole"
              type="text"
              value={formDev.role}
              onChange={(e) =>
                setFormDev({ ...formDev, role: e.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <label htmlFor="devPhone">Teléfono</label>
            <input
              id="devPhone"
              type="tel"
              value={formDev.phone}
              onChange={(e) =>
                setFormDev({ ...formDev, phone: e.target.value })
              }
            />
          </div>

          <button
            className="btn-gradient"
            type="submit"
            disabled={cargando}
          >
            {cargando
              ? 'Guardando...'
              : editando
                ? 'Guardar cambios'
                : 'Registrar integrante'}
          </button>

          {editando && (
            <button
              type="button"
              className="icon-btn"
              onClick={() => {
                setEditando(null);
                setFormDev({ name: '', role: '', phone: '' });
              }}
            >
              Cancelar edición
            </button>
          )}

        </form>
      </div>

      {/* ================================= */}
      {/* LISTADO DE DESARROLLADORES */}
      {/* ================================= */}

      <h3 style={{ marginTop: 35 }}>
        Equipo de desarrollo ({devs.length})
      </h3>

      <div className="dev-grid">

        {devs.map((d) => (
          <article key={d.id} className="dev-card">

            <div className="avatar" aria-hidden="true">
              {d.name.charAt(0)}
            </div>

            <h4>{d.name}</h4>

            <p className="role">{d.role}</p>

            <p className="phone">
              Teléfono: {d.phone || 'No registrado'}
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => prepararEdicion(d)}
              >
                Editar
              </button>

              <button
                type="button"
                className="icon-btn"
                onClick={() => eliminarDev(d.id)}
              >
                Eliminar
              </button>
            </div>

          </article>
        ))}

      </div>

      {/* ================================= */}
      {/* FORMULARIO DE EDICIÓN DE PQR */}
      {/* ================================= */}

      <div className="panel" style={{ marginTop: 45 }}>

        <h3>
          {editandoPqr ? 'Editar solicitud PQR' : 'Gestión de solicitudes PQR'}
        </h3>

        {editandoPqr ? (
          <form onSubmit={guardarPqr} className="form">

            <div className="field">
              <label htmlFor="pqrName">Nombre</label>
              <input
                id="pqrName"
                value={formPqr.nombre}
                onChange={(e) =>
                  setFormPqr({ ...formPqr, nombre: e.target.value })
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="pqrEmail">Correo electrónico</label>
              <input
                id="pqrEmail"
                type="email"
                value={formPqr.email}
                onChange={(e) =>
                  setFormPqr({ ...formPqr, email: e.target.value })
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="pqrPhone">Teléfono</label>
              <input
                id="pqrPhone"
                type="tel"
                value={formPqr.telefono}
                onChange={(e) =>
                  setFormPqr({ ...formPqr, telefono: e.target.value })
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="pqrMessage">Mensaje</label>
              <textarea
                id="pqrMessage"
                value={formPqr.mensaje}
                onChange={(e) =>
                  setFormPqr({ ...formPqr, mensaje: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="btn-gradient"
              disabled={cargando}
            >
              Guardar cambios
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={() => {
                setEditandoPqr(null);
                setFormPqr({
                  nombre: '',
                  email: '',
                  telefono: '',
                  mensaje: ''
                });
              }}
            >
              Cancelar
            </button>

          </form>
        ) : (
          <p className="section-sub">
            Aquí puedes consultar, editar y eliminar las solicitudes recibidas.
          </p>
        )}

      </div>

      {/* ================================= */}
      {/* LISTADO DE PQR */}
      {/* ================================= */}

      <h3 style={{ marginTop: 30 }}>
        Solicitudes recibidas ({pqrs.length})
      </h3>

      {pqrs.length === 0 ? (
        <p className="section-sub">
          No hay solicitudes PQR registradas.
        </p>
      ) : (

        <div style={{ display: 'grid', gap: 15 }}>

          {pqrs.map((p) => (
            <article
              key={p.id}
              className="dev-card"
              style={{ textAlign: 'left' }}
            >

              <h4>{p.nombre}</h4>

              <p>Correo: {p.email}</p>
              <p>Teléfono: {p.telefono}</p>
              <p>Mensaje: {p.mensaje}</p>

              <small>
                Fecha: {new Date(p.fecha).toLocaleString('es-CO')}
              </small>

              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => prepararEdicionPqr(p)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => eliminarPqr(p.id)}
                >
                  Eliminar
                </button>
              </div>

            </article>
          ))}

        </div>

      )}

    </section>
  );
}
