/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Razorpay public Key ID from the Razorpay dashboard (rzp_test_... / rzp_live_...). */
  readonly VITE_RAZORPAY_KEY_ID?: string
  /**
   * Optional backend endpoint used to create a Razorpay order before checkout.
   * POST body: { amount: number, currency: 'INR', receipt: string }
   * Response: { id: string }
   * Required for live mode; test mode can run without it.
   */
  readonly VITE_RAZORPAY_ORDER_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
