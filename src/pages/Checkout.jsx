
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const {
    cart,
    clearCart,
    total,
    removeFromCart,
    updateQuantity
  } = useContext(CartContext);

  const [pagado, setPagado] = useState(false);
  const [totalPagado, setTotalPagado] = useState(0);
  const [comprador, setComprador] = useState({
    nombre: '',
    email: '',
    metodo: 'Tarjeta de prueba'
  });

  const [error, setError] = useState('');

  const cambiarDato = (e) => {
    const { name, value } = e.target;

    setComprador((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const pagar = (e) => {
    e.preventDefault();
    setError('');

    if (cart.length === 0) {
      setError('No tienes productos en el carrito.');
      return;
    }

    if (comprador.nombre.trim().length < 3) {
      setError('Escribe un nombre válido.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(comprador.email)) {
      setError('Escribe un correo electrónico válido.');
      return;
    }

    // Simulación de pago, no se realiza ningún cobro real.
    setTotalPagado(total);
    clearCart();
    setPagado(true);
  };

  if (pagado) {
    return (
      <section
        className="section narrow"
        style={{ textAlign: 'center' }}
      >
        <p className="success" role="status">
          ¡Compra realizada exitosamente!
        </p>

        <h2 className="section-title">
          Gracias por confiar en Koralyx Technologies
        </h2>

        <p>
          Hola, {comprador.nombre}. Tu pago de prueba fue procesado
          correctamente.
        </p>

        <h3 className="total">
          Total de la compra:
          <span className="accent">
            {' '}${totalPagado.toLocaleString('es-CO')} COP
          </span>
        </h3>

        <p>
          Método de pago: {comprador.metodo}
        </p>

        <p>
          Confirmación enviada de manera simulada a: {comprador.email}
        </p>

        <Link to="/" className="btn-gradient">
          Volver al inicio
        </Link>
      </section>
    );
  }

  return (
    <section
      className="section"
      style={{ maxWidth: 940, margin: '0 auto' }}
    >
      <h2 className="section-title">Tu carrito de compras</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: 20 }}>
          Aún no agregas servicios.

          {' '}
          <Link
            to="/#servicios"
            className="accent"
            style={{ fontWeight: 600 }}
          >
            Ver servicios
          </Link>
        </p>
      ) : (
        <div className="checkout-grid">

          {/* Resumen del carrito */}
          <div className="panel">
            <h3>Resumen de tu compra</h3>

            {cart.map((item) => (
              <div
                className="row"
                key={item.id}
                style={{
                  padding: '14px 0',
                  borderBottom: '1px solid #ddd',
                  gap: 12
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong>{item.name}</strong>

                  <p>
                    Precio unitario: $
                    {Number(item.price).toLocaleString('es-CO')} COP
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginTop: 8
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label={`Disminuir cantidad de ${item.name}`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <strong>
                    ${(Number(item.price) * item.quantity)
                      .toLocaleString('es-CO')} COP
                  </strong>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      display: 'block',
                      marginTop: 10
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <h3 className="total">
              Total:
              <span className="accent">
                {' '}${total.toLocaleString('es-CO')} COP
              </span>
            </h3>

            <button
              type="button"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
          </div>

          {/* Formulario de pago ficticio */}
          <div className="panel">
            <h3 style={{ marginBottom: 20 }}>
              Pasarela de pago de demostración
            </h3>

            <p>
              Completa tus datos para simular la compra.
              No ingreses información bancaria real.
            </p>

            <form className="form" onSubmit={pagar}>
              <div className="field">
                <label htmlFor="nombre">
                  Nombre completo
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  value={comprador.nombre}
                  onChange={cambiarDato}
                  minLength="3"
                  maxLength="80"
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className="field">
                <label htmlFor="email">
                  Correo electrónico
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={comprador.email}
                  onChange={cambiarDato}
                  required
                  placeholder="nombre@correo.com"
                />
              </div>

              <div className="field">
                <label htmlFor="metodo">
                  Método de pago
                </label>

                <select
                  id="metodo"
                  name="metodo"
                  value={comprador.metodo}
                  onChange={cambiarDato}
                >
                  <option>Tarjeta de prueba</option>
                  <option>Transferencia de prueba</option>
                  <option>Pago electrónico de prueba</option>
                </select>
              </div>

              {error && (
                <p role="alert" style={{ color: 'red' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-gradient btn-block"
                disabled={cart.length === 0}
              >
                Confirmar compra de prueba
              </button>
            </form>

            <p style={{ marginTop: 15, fontSize: 12 }}>
              Esta funcionalidad es únicamente académica.
              No procesa pagos reales ni realiza transacciones.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
