/** Delivery is free once the cart subtotal reaches this amount. */
export const FREE_DELIVERY_AT = 999

/** Flat delivery fee for orders below the free-delivery threshold. */
export const DELIVERY_FEE = 49

/** Delivery fee for a given cart subtotal (0 for an empty cart). */
export function getDeliveryFee(subtotal: number): number {
  if (subtotal <= 0 || subtotal >= FREE_DELIVERY_AT) return 0
  return DELIVERY_FEE
}
