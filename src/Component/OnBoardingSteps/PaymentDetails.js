'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggle_sidebar } from '@/utils/redux/slices/sidebarSlice/manageSidebar';
import { API_CONFIG } from '@/config/app_config';

const PAYMENT_PRICE = process.env.NEXT_PUBLIC_PAYMENT_PRICE || 4.99;
const TRIAL_LABEL = 'First 30 days free for verified establishments';
const AFTER_TRIAL_LABEL = `Then $${PAYMENT_PRICE}/month — charged automatically each month`;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const PRICE_IDS = (process.env.NEXT_PUBLIC_PRICE_IDS || '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

const normalizeForKey = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const buildIdempotencySource = (hotelFormData, selectedPriceId) => {
  const parts = [
    'checkout-v1',
    normalizeForKey(hotelFormData?.owneremail),    
    normalizeForKey(hotelFormData?.establishmentname),      
    normalizeForKey(selectedPriceId),
  ];

  return parts.join('|');
};

const sha256Hex = async (input) => {
  const encoded = new TextEncoder().encode(input);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const getLatLongFromAddress = async (address) => {
  if (!GOOGLE_MAPS_API_KEY) {
    return null;
  }

  const formattedAddress = [
    address?.streetAddress,
    address?.suiteUnitNumber,
    address?.city,
    address?.state,
    address?.pinCode,
    address?.country,
  ]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join(', ');

  if (!formattedAddress) {
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data?.status !== 'OK') {
      return null;
    }

    const location = data?.results?.[0]?.geometry?.location;
    if (!location) {
      return null;
    }

    return { lat: location.lat, lng: location.lng };
  } catch {
    return null;
  }
};

function PaymentDetails({ col, setStep, onCompleteSetup, hotelFormData, isSubmitting }) {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState(
    PRICE_IDS.length > 0 ? PRICE_IDS[0] : ''
  );

  const handleToggle = () => {
    dispatch(toggle_sidebar(false));
  };

  const handleBack = () => {
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || isSubmitting) return;

    if (PRICE_IDS.length > 0 && !selectedPriceId) {
      setError('Please select a subscription plan.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const idempotencySource = buildIdempotencySource(hotelFormData, selectedPriceId);
      const idempotencyKey = await sha256Hex(idempotencySource);

      const hotelToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('phloii_token_auth')
          : null;

      const geolocation = await getLatLongFromAddress({
        streetAddress: hotelFormData?.streetaddress,
        suiteUnitNumber: hotelFormData?.unitNumber,
        city: hotelFormData?.city,
        state: hotelFormData?.state,
        pinCode: hotelFormData?.pincode,
        country: hotelFormData?.country,
      });

      const hasAddressInput = [
        hotelFormData?.streetaddress,
        hotelFormData?.unitNumber,
        hotelFormData?.city,
        hotelFormData?.state,
        hotelFormData?.pincode,
        hotelFormData?.country,
      ].some((field) => String(field || '').trim().length > 0);

      if (hasAddressInput && !geolocation) {
        throw new Error('Address is invalid. Please check the address and try again.');
      }

      const formdata = new FormData();

      // Map hotel form fields to API field names (same as saveHotelDetails)
      formdata.append('establishmentName', hotelFormData?.establishmentname || '');
      formdata.append('establishmentType', hotelFormData?.establishedtype || '');
      formdata.append('streetAddress', hotelFormData?.streetaddress || '');
      formdata.append('suiteUnitNumber', hotelFormData?.unitNumber || '');
      formdata.append('country', hotelFormData?.country || '');
      formdata.append('state', hotelFormData?.state || '');
      formdata.append('city', hotelFormData?.city || '');
      formdata.append('pinCode', hotelFormData?.pincode || '');
      formdata.append('ownerName', hotelFormData?.ownername || '');
      formdata.append('ownerPhone', hotelFormData?.ownerphone || '');
      formdata.append('websiteLink', hotelFormData?.webSitelink || '');
      formdata.append('ownerEmail', hotelFormData?.owneremail || '');
      formdata.append('why_want_phloi', hotelFormData?.whyphloii || '');
      formdata.append('uniqueFeatures', hotelFormData?.uniquefeatures || '');
      formdata.append('inPersonVisitAvailability', hotelFormData?.inpersonvisit || '');
      formdata.append('safeWord', hotelFormData?.safeWord || '');
      formdata.append('atmosphere_description', hotelFormData?.atmosphere_description || '');
      formdata.append('food', hotelFormData?.food || '');
      formdata.append('additional_information', hotelFormData?.additional_information || '');
      formdata.append('openTiming', hotelFormData?.opentiming || '');
      formdata.append('closeTiming', hotelFormData?.closetiming || '');
      formdata.append('customerServiceNumber', hotelFormData?.customerservicenumber || '');

      if (geolocation) {
        formdata.append('lat', String(geolocation.lat));
        formdata.append('lng', String(geolocation.lng));
      }

      (hotelFormData?.images || []).forEach((image) => {
        formdata.append('images', image);
      });

      if (selectedPriceId && PRICE_IDS.length > 0) {
        formdata.append('priceId', selectedPriceId);
      }

      const res = await fetch(`${API_CONFIG.BASE_URL}/hotel/checkout`, {
        method: 'POST',
        headers: {
          'Idempotency-Key': idempotencyKey,
          ...(hotelToken ? { Authorization: `Bearer ${hotelToken}` } : {}),
        },
        body: formdata,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.type !== 'success') {
        throw new Error(
          data?.message || data?.error || 'Subscription failed'
        );
      }

      const checkoutUrl = data?.data?.url;

      if (checkoutUrl && typeof window !== 'undefined') {
        window.location.href = checkoutUrl;
        return;
      }
    } catch (err) {
      setError(err.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || isSubmitting;

  return (
    <div onClick={handleToggle} className={col || ''}>
      <div className="mb-4 payment-pricing-box">
        <div className="payment-pricing-row payment-pricing-trial">
          <span className="payment-pricing-badge">Trial</span>
          <span>{TRIAL_LABEL}</span>
        </div>
        <div className="payment-pricing-row">
          <span>{AFTER_TRIAL_LABEL}</span>
        </div>
        <p className="payment-pricing-note">
          Your first 30 days are free. After the trial, your selected plan will be charged
          automatically each month.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {PRICE_IDS.length > 0 && (
          <div className="mb-3">
            <label className="form-label cmn_label">Subscription</label>
            <div className="d-flex flex-column gap-2">
              {PRICE_IDS.map((id, index) => (
                <div
                  key={id}
                  className="form-check subscription-plan-option text-white-50"
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="subscriptionPlan"
                    id={`subscription-plan-${index}`}
                    value={id}
                    checked={selectedPriceId === id}
                    onChange={() => setSelectedPriceId(id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`subscription-plan-${index}`}
                  >
                    {PRICE_IDS.length === 1
                      ? 'Phloii Verified – first 30 days free, then $4.99/month'
                      : `Plan ${index + 1} – first 30 days free, then $4.99/month`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="payment-error mb-3" role="alert">
            {error}
          </div>
        )}

        <div className="d-flex justify-content-end gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleBack}
            className="grey_btn cmn_btn"
            disabled={disabled}
          >
            Previous
          </button>
          <button
            type="submit"
            className="cmn_btn"
            disabled={disabled}
          >
            {loading || isSubmitting ? 'Processing…' : 'Complete setup'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentDetails;

