'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_CONFIG } from '@/config/app_config';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [redirectPath, setRedirectPath] = useState('/establishment');

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

        if (redirectUrl) {
          setRedirectPath(redirectUrl);
        }

        setStatus('done');
      } catch (err) {
        setError(err.message || 'Payment confirmation failed.');
        setStatus('error');
      }
    };

    confirmSubscription();
  }, [router]);

  useEffect(() => {
    let timer;
    if (status === 'done' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (status === 'done' && countdown === 0) {
      if (typeof window !== 'undefined') {
        window.location.href = redirectPath;
      }
    }
    return () => clearInterval(timer);
  }, [status, countdown, redirectPath]);

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

        {!isLoading && !error && status === 'done' && (
          <>
            <h1 className="h4 mb-3">Payment confirmed</h1>
            <p className="text-muted">
              Your payment was successful. You can now continue using Phloii.
            </p>
            <div className="mt-4 p-3 bg-light border rounded text-center">
              <p className="mb-0">
                Redirecting to your dashboard in <strong>{countdown}</strong> seconds...
              </p>
            </div>
            <button
              type="button"
              className="cmn_btn w-100 mt-3"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = redirectPath;
                }
              }}
            >
              Go to Dashboard Now
            </button>
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

