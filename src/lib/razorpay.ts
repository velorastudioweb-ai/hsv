/**
 * Small wrapper around the Razorpay Checkout script.
 *
 * Configuration is read from Vite environment variables (see .env.example):
 * - VITE_RAZORPAY_KEY_ID: public key ID. When missing, checkout is disabled.
 * - VITE_RAZORPAY_ORDER_API_URL: optional backend order-creation endpoint.
 *   Live-mode payments require an order_id, so set this before going live.
 */

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

export interface RazorpayCheckoutOptions {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  image?: string
  order_id?: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  notes?: Record<string, string>
  theme?: { color?: string }
  modal?: { ondismiss?: () => void }
  handler: (response: RazorpayResponse) => void
}

type RazorpayConstructor = new (options: RazorpayCheckoutOptions) => { open: () => void }

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor
  }
}

const CHECKOUT_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'

let scriptPromise: Promise<boolean> | null = null

export function getRazorpayKeyId(): string {
  return (import.meta.env.VITE_RAZORPAY_KEY_ID ?? '').trim()
}

export function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.Razorpay) return Promise.resolve(true)

  if (!scriptPromise) {
    scriptPromise = new Promise<boolean>((resolve) => {
      const script = document.createElement('script')
      script.src = CHECKOUT_SCRIPT_URL
      script.async = true
      script.onload = () => resolve(Boolean(window.Razorpay))
      script.onerror = () => {
        script.remove()
        scriptPromise = null
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  return scriptPromise
}

/** Returns an order id when an order API is configured, otherwise undefined. */
export async function createRazorpayOrder(
  amount: number,
  receipt: string,
): Promise<string | undefined> {
  const url = (import.meta.env.VITE_RAZORPAY_ORDER_API_URL ?? '').trim()
  if (!url) return undefined

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency: 'INR', receipt }),
  })

  if (!response.ok) {
    throw new Error('We could not start your payment. Please try again or contact us.')
  }

  const data: unknown = await response.json()
  const id = (data as { id?: unknown } | null)?.id
  if (typeof id !== 'string' || !id) {
    throw new Error('The payment service returned an invalid order. Please try again.')
  }
  return id
}

export function openRazorpayCheckout(options: RazorpayCheckoutOptions): void {
  if (!window.Razorpay) {
    throw new Error('The payment gateway could not be loaded. Please check your connection.')
  }
  new window.Razorpay(options).open()
}
