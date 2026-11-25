import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { FREE_DELIVERY_AT, getDeliveryFee } from '../data/pricing'
import { INDIAN_STATES } from '../data/states'
import { brand, SITE_URL } from '../data/site'
import {
  createRazorpayOrder,
  getRazorpayKeyId,
  loadRazorpayScript,
  openRazorpayCheckout,
} from '../lib/razorpay'
import { useSEO } from '../hooks/useSEO'

interface CheckoutForm {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

interface CompletedPayment {
  paymentId: string
  orderId?: string
  lines: Array<{ name: string; quantity: number; lineTotal: number }>
  delivery: number
  total: number
  address: string
}

const emptyForm: CheckoutForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
}

export function Checkout() {
  useSEO({
    title: 'Checkout',
    description: 'Review your basket and pay securely with Razorpay at HSV Sugandhika.',
    path: 'checkout',
  })

  const { items, subtotal, count, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutForm>(emptyForm)
  const [status, setStatus] = useState<'idle' | 'processing'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [completedPayment, setCompletedPayment] = useState<CompletedPayment | null>(null)

  const deliveryFee = getDeliveryFee(subtotal)
  const total = subtotal + deliveryFee
  const paymentsConfigured = Boolean(getRazorpayKeyId())

  const update = (key: keyof CheckoutForm, value: string) =>
    setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (items.length === 0 || status === 'processing') return

    setErrorMessage('')
    if (!paymentsConfigured) {
      setErrorMessage(
        'Online payments are not configured yet. Please contact us on WhatsApp to complete your order.',
      )
      return
    }

    setStatus('processing')
    try {
      const ready = await loadRazorpayScript()
      if (!ready) {
        throw new Error('The payment gateway could not be loaded. Please check your connection.')
      }

      const amount = Math.round(total * 100)
      const orderId = await createRazorpayOrder(amount, `hsv_${Date.now()}`)
      const address = `${form.address}, ${form.city}, ${form.state} ${form.pincode}`
      const lines = items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      }))

      openRazorpayCheckout({
        key: getRazorpayKeyId(),
        amount,
        currency: 'INR',
        name: brand.name,
        description: 'Your sacred essentials order',
        image: `${SITE_URL}favicon.svg`,
        order_id: orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: {
          items: lines.map((line) => `${line.name} x${line.quantity}`).join(', '),
          address,
        },
        theme: { color: '#49372b' },
        modal: { ondismiss: () => setStatus('idle') },
        handler: (response) => {
          setCompletedPayment({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id ?? orderId,
            lines,
            delivery: deliveryFee,
            total,
            address,
          })
          clearCart()
          setStatus('idle')
        },
      })
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
      setStatus('idle')
    }
  }

  if (completedPayment) {
    const orderText = [
      'Hello HSV Sugandhika! I have completed a payment on your website.',
      '',
      ...completedPayment.lines.map(
        (line) => `${line.name} × ${line.quantity} = ${formatPrice(line.lineTotal)}`,
      ),
      '',
      `Delivery: ${completedPayment.delivery === 0 ? 'FREE' : formatPrice(completedPayment.delivery)}`,
      `Total paid: ${formatPrice(completedPayment.total)}`,
      `Payment ID: ${completedPayment.paymentId}`,
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Address: ${completedPayment.address}`,
    ].join('\n')

    return (
      <div className="page checkout-page">
        <div className="container">
          <div className="payment-success">
            <span className="payment-success__icon"><CheckCircle2 size={44} strokeWidth={1.3} /></span>
            <p className="eyebrow eyebrow--line">Payment received</p>
            <h1>Thank you for your order</h1>
            <p className="payment-success__intro">
              Your payment was successful. We will prepare your sacred essentials
              and deliver them to:
            </p>
            <p className="payment-success__address">{completedPayment.address}</p>
            <div className="payment-success__meta">
              <div><span>Payment ID</span><strong>{completedPayment.paymentId}</strong></div>
              {completedPayment.orderId && (
                <div><span>Order ID</span><strong>{completedPayment.orderId}</strong></div>
              )}
              <div><span>Amount paid</span><strong>{formatPrice(completedPayment.total)}</strong></div>
              <div>
                <span>Delivery</span>
                <strong>
                  {completedPayment.delivery === 0
                    ? 'FREE'
                    : formatPrice(completedPayment.delivery)}
                </strong>
              </div>
            </div>
            <div className="payment-success__actions">
              <a
                className="button button--primary"
                href={`${brand.whatsappUrl}?text=${encodeURIComponent(orderText)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} /> Send order details on WhatsApp
              </a>
              <Link to="/shop" className="button button--ghost">Continue shopping</Link>
            </div>
            <p className="payment-success__note">
              Please keep the payment ID for your records. Need help? Reach us on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="page checkout-empty">
        <div className="container">
          <h1>Your cart is empty</h1>
          <p>Add a few sacred essentials before starting checkout.</p>
          <Link to="/shop" className="button button--primary">Explore Collection</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page checkout-page">
      <div className="container">
        <Link to="/shop" className="back-link"><ArrowLeft size={16} /> Continue shopping</Link>
        <div className="checkout-heading">
          <p className="eyebrow eyebrow--line">Almost there</p>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-grid">
          <div className="checkout-form-wrap">
            <div className="payment-notice" role="status">
              <CreditCard size={20} />
              <div>
                <strong>Secure payment with Razorpay</strong>
                <p>
                  Pay with UPI, cards, net banking or wallets. Your card details
                  are handled by Razorpay and are never stored on this website.
                  {!paymentsConfigured &&
                    ' Online payments are being enabled — please contact us on WhatsApp if you cannot pay.'}
                </p>
              </div>
            </div>

            <form className="checkout-form" onSubmit={submit}>
              <h2>Delivery details</h2>
              <div className="form-row">
                <label>Full name
                  <input required value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" />
                </label>
                <label>Phone number
                  <input required type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
                </label>
              </div>
              <label>Email address
                <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" />
              </label>
              <label>Street address
                <input required value={form.address} onChange={(e) => update('address', e.target.value)} autoComplete="street-address" />
              </label>
              <div className="form-row form-row--three">
                <label>City
                  <input required value={form.city} onChange={(e) => update('city', e.target.value)} autoComplete="address-level2" />
                </label>
                <label>State
                  <select
                    required
                    value={form.state}
                    onChange={(e) => update('state', e.target.value)}
                    autoComplete="address-level1"
                  >
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </label>
                <label>PIN code
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    title="Enter a 6-digit PIN code"
                    value={form.pincode}
                    onChange={(e) => update('pincode', e.target.value)}
                    autoComplete="postal-code"
                  />
                </label>
              </div>

              {errorMessage && <div className="checkout-error" role="alert">{errorMessage}</div>}

              <div className="checkout-security">
                <ShieldCheck size={18} />
                <span>Your details are used only to prepare and deliver your order.</span>
              </div>

              <button
                type="submit"
                className="button button--primary button--full"
                disabled={status === 'processing'}
              >
                <CreditCard size={18} />
                {status === 'processing'
                  ? 'Opening secure payment…'
                  : `Pay ${formatPrice(total)} with Razorpay`}
              </button>
              <p className="checkout-form__fineprint">
                You will be taken to Razorpay’s secure checkout to complete the payment.
              </p>
            </form>
          </div>

          <aside className="order-summary">
            <h2>Order Summary</h2>
            <p className="order-summary__count">{count} {count === 1 ? 'item' : 'items'}</p>
            <div className="order-summary__lines">
              {items.map((item) => (
                <div className="order-line" key={item.slug}>
                  <img src={item.product.image} alt="" />
                  <div>
                    <strong>{item.product.name}</strong>
                    <span>Qty {item.quantity}</span>
                  </div>
                  <span>{formatPrice(item.lineTotal)}</span>
                </div>
              ))}
            </div>
            <div className="order-summary__totals">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div>
                <span><Truck size={14} /> Delivery</span>
                <strong className={deliveryFee === 0 ? 'order-summary__free' : ''}>
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                </strong>
              </div>
            </div>
            <div className="order-summary__total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <p className="order-summary__note">
              Free delivery on orders above {formatPrice(FREE_DELIVERY_AT)}.
              Free gift on orders above ₹1,999.
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
