import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 p-8 max-w-2xl">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-600">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>

        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
            What Happens Next?
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-medium text-primary">Check Your Email</p>
                <p className="text-sm text-gray-600">You'll receive order confirmation and tracking info</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-medium text-primary">We'll Prepare Your Order</p>
                <p className="text-sm text-gray-600">Your collection will be carefully packaged</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-medium text-primary">Free Delivery</p>
                <p className="text-sm text-gray-600">Expect delivery in 5-7 business days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏠</span>
              <div>
                <p className="font-medium text-primary">Transform Your Space</p>
                <p className="text-sm text-gray-600">Hang your coordinated collection with confidence</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/collections" className="btn-primary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-outline">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
