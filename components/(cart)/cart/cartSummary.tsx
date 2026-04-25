'use client';
import { useCart } from '../../../store/cart/cartStore';
import { formatPrice } from '../../../hooks/formatePrice';

export default function CartSummary() {
  const { getTotalAmount, getTotalItems } = useCart();
  const total = getTotalAmount();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50">
      <div className="max-w-2xl mx-auto px-5 py-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">
              {getTotalItems()} items • Total
            </p>
            <p className="text-3xl font-bold tracking-tight">{formatPrice(total)}</p>
          </div>

          <button
            onClick={() => alert('Proceeding to checkout...')} // replace with your logic
            className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-10 py-4 rounded-3xl font-semibold text-lg active:scale-95"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}