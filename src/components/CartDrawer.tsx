import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { FREE_DELIVERY_AT, getDeliveryFee } from '../data/pricing'

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeCart])

  const remaining = Math.max(0, FREE_DELIVERY_AT - subtotal)
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_AT) * 100)
  const deliveryFee = getDeliveryFee(subtotal)

  return (
    <div className={`drawer-layer${isOpen ? ' drawer-layer--open' : ''}`} aria-hidden={!isOpen}>
      <button
        type="button"
        className="drawer-backdrop"
        onClick={closeCart}
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
      />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <header className="cart-drawer__head">
          <div>
            <p className="eyebrow">Your basket</p>
            <h2>Shopping Cart</h2>
          </div>
          <button type="button" className="icon-button" onClick={closeCart} aria-label="Close cart">
            <X size={22} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <span className="cart-drawer__empty-icon"><ShoppingBag size={38} strokeWidth={1.2} /></span>
            <h3>Your cart is still empty</h3>
            <p>Explore handcrafted essentials created with devotion.</p>
            <Link to="/shop" className="button button--primary" onClick={closeCart}>
              Explore Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-progress">
              <p>
                {remaining > 0
                  ? `Add ${formatPrice(remaining)} more for free delivery`
                  : 'You have unlocked free delivery'}
              </p>
              <div className="cart-progress__track">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="cart-drawer__items">
              {items.map((item) => (
                <article className="cart-line" key={item.slug}>
                  <Link to={`/products/${item.slug}`} onClick={closeCart} className="cart-line__image">
                    <img src={item.product.image} alt={item.product.imageAlt} loading="lazy" />
                  </Link>
                  <div className="cart-line__body">
                    <div className="cart-line__top">
                      <Link to={`/products/${item.slug}`} onClick={closeCart} className="cart-line__title">
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        className="cart-line__remove"
                        onClick={() => removeItem(item.slug)}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="cart-line__category">{item.product.category}</p>
                    <div className="cart-line__bottom">
                      <div className="qty-stepper qty-stepper--small">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <strong>{formatPrice(item.lineTotal)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="cart-drawer__foot">
              <div className="cart-drawer__totals">
                <div>
                  <span>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div>
                  <span>Delivery</span>
                  <strong>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</strong>
                </div>
              </div>
              <div className="cart-drawer__subtotal">
                <span>Total</span>
                <strong>{formatPrice(subtotal + deliveryFee)}</strong>
              </div>
              <p className="cart-drawer__note">
                Delivery is free on orders above {formatPrice(FREE_DELIVERY_AT)}.
              </p>
              <Link to="/checkout" className="button button--primary button--full" onClick={closeCart}>
                Proceed to Checkout <ArrowRight size={17} />
              </Link>
              <button type="button" className="text-button" onClick={closeCart}>
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
