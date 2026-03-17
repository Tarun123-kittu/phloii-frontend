'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_CONFIG } from '@/config/app_config';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const confirmSubscription = async () => {
      try {
        let sessionId = null;

        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          sessionId = params.get('session_id');
        }

        if (!sessionId) {
          setError('Missing Stripe session ID.');
          setStatus('error');
          return;
        }

        const token =
          typeof window !== 'undefined'
            ? localStorage.getItem('phloii_token_auth')
            : null;

        if (!token) {
          // If we don't have an auth token, send the user back to login
          router.replace('/establishment/login');
          return;
        }

        const res = await fetch(
          `${API_CONFIG.BASE_URL}/success/json?session_id=${encodeURIComponent(
            sessionId
          )}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
          }
        );

        const data = await res.json().catch(() => null);

        if (!res.ok || !data) {
          throw new Error(
            data?.message || data?.error || 'Unable to confirm payment.'
          );
        }

        // Support both wrapped and flat response shapes
        const payload = data.data || data;
        const redirectUrl = payload.redirectUrl;

        if (redirectUrl && typeof window !== 'undefined') {
          window.location.href = redirectUrl;
          return;
        }

        setStatus('done');
      } catch (err) {
        setError(err.message || 'Payment confirmation failed.');
        setStatus('error');
      }
    };

    confirmSubscription();
  }, [router]);

  const isLoading = status === 'loading';

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: 480 }}>
        {isLoading && (
          <>
            <h1 className="h4 mb-3">Finalizing your subscription…</h1>
            <p className="text-muted">
              Please wait a moment while we confirm your payment and take you to your
              dashboard.
            </p>
          </>
        )}

        {!isLoading && !error && (
          <>
            <h1 className="h4 mb-3">Payment confirmed</h1>
            <p className="text-muted">
              Your payment was successful. You can now continue using Phloii.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="h4 mb-3">We could not confirm your payment</h1>
            <p className="text-danger mb-3">{error}</p>
            <button
              type="button"
              className="cmn_btn"
              onClick={() => router.push('/establishment/onboarding')}
            >
              Back to onboarding
            </button>
          </>
        )}
      </div>
    </div>
  );
}

