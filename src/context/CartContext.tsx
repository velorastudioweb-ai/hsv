import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProduct, type Product } from '../data/products'

const STORAGE_KEY = 'hsv-sugandhika-cart-v1'

export interface CartLine {
  slug: string
  quantity: number
}

interface CartItem extends CartLine {
  product: Product
  lineTotal: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (slug: string, quantity?: number) => void
  /** Replace the cart with a single item and go straight to checkout. */
  buyNow: (slug: string, quantity?: number) => void
  updateQuantity: (slug: string, quantity: number) => void
  removeItem: (slug: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function readStoredCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (line): line is CartLine =>
          typeof line === 'object' &&
          line !== null &&
          typeof (line as CartLine).slug === 'string' &&
          typeof (line as CartLine).quantity === 'number' &&
          (line as CartLine).quantity > 0 &&
          Boolean(getProduct((line as CartLine).slug)),
      )
      .map((line) => ({
        slug: line.slug,
        quantity: Math.min(Math.floor(line.quantity), 99),
      }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStoredCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Storage can be unavailable in private browsing; cart still works in memory.
    }
  }, [lines])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const addItem = useCallback((slug: string, quantity = 1) => {
    if (!getProduct(slug)) return
    setLines((current) => {
      const existing = current.find((line) => line.slug === slug)
      if (existing) {
        return current.map((line) =>
          line.slug === slug
            ? { ...line, quantity: Math.min(line.quantity + quantity, 99) }
            : line,
        )
      }
      return [...current, { slug, quantity: Math.min(quantity, 99) }]
    })
    setIsOpen(true)
  }, [])

  const buyNow = useCallback((slug: string, quantity = 1) => {
    if (!getProduct(slug)) return
    setLines([{ slug, quantity: Math.min(Math.max(1, Math.floor(quantity)), 99) }])
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) =>
            line.slug === slug
              ? { ...line, quantity: Math.min(Math.floor(quantity), 99) }
              : line,
          ),
    )
  }, [])

  const removeItem = useCallback((slug: string) => {
    setLines((current) => current.filter((line) => line.slug !== slug))
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const items = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getProduct(line.slug)
        if (!product) return []
        return [
          {
            ...line,
            product,
            lineTotal: product.price * line.quantity,
          },
        ]
      }),
    [lines],
  )

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.lineTotal, 0),
    [items],
  )

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    buyNow,
    updateQuantity,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
