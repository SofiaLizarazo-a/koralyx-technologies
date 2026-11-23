import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [pagado, setPagado] = useState(false);
  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const pagar = (e) => {
    e.preventDefault();
    clearCart();
    setPagado(true);
  };

  if (pagado) {
    return (
      <section className="section narrow" style={{ textAlign: 'center' }}>
        <p className="success" role="status">¡Pago procesado! (pasarela ficticia)</p>
        <p style={{ marginBottom: 20 }}>Gracias por confiar en Koralyx.</p>
        <Link to="/" className="btn-gradient">Volver al inicio</Link>
      </section>
    );
  }

  return (
    <section className="section" style={{ maxWidth: 940, margin: '0 auto' }}>
      <h2 className="section-title">Tu carrito</h2>
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: 20 }}>
          Aún no agregas servicios. <Link to="/#servicios" className="accent" style={{ fontWeight: 600 }}>Ver servicios</Link>
        </p>
      ) : (
        <div className="checkout-grid">
          <div className="panel">
            {cart.map(i => (
              <div className="row" key={i.id}>
                <span>{i.quantity}× {i.name}</span>
                <b>${(i.price * i.quantity).toLocaleString('es-CO')}</b>
              </div>
            ))}
            <h3 className="total">Total: <span className="accent">${total.toLocaleString('es-CO')} COP</span></h3>
          </div>

          <div className="panel">
            <h3 style={{ marginBottom: 20 }}>Pasarela de pago</h3>
            <form className="form" onSubmit={pagar}>
              <div className="field"><label htmlFor="cn">Nombre en la tarjeta</label><input id="cn" required /></div>
              <div className="field"><label htmlFor="cc">Número de tarjeta</label><input id="cc" required inputMode="numeric" pattern="\d{16}" placeholder="16 dígitos" title="16 dígitos sin espacios" /></div>
              <div className="two-cols">
                <div className="field"><label htmlFor="ex">Vence</label><input id="ex" required pattern="(0[1-9]|1[0-2])/\d{2}" placeholder="MM/AA" title="Formato MM/AA" /></div>
                <div className="field"><label htmlFor="cv">CVV</label><input id="cv" required inputMode="numeric" pattern="\d{3}" placeholder="123" title="3 dígitos" /></div>
              </div>
              <button type="submit" className="btn-gradient btn-block">Pagar ahora</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
