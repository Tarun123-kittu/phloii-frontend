'use client';

import { useRouter } from 'next/navigation';

export default function PaymentFailedPage() {
  const router = useRouter();

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: 480 }}>
        <h1 className="h4 mb-3">Payment was not completed</h1>
        <p className="text-muted mb-4">
          It looks like your Stripe payment was cancelled or failed. No charges have been
          made.
        </p>
        <div className="d-flex gap-3 flex-wrap">
          <button
            type="button"
            className="grey_btn cmn_btn"
            onClick={() => router.push('/establishment/onboarding')}
          >
            Back to onboarding
          </button>
          <button
            type="button"
            className="cmn_btn"
            onClick={() => router.push('/establishment')}
          >
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
}

