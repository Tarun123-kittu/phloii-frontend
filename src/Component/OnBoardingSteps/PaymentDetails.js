'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggle_sidebar } from '@/utils/redux/slices/sidebarSlice/manageSidebar';
import { API_CONFIG } from '@/config/app_config';

const PAYMENT_PRICE = 9.99;
const TRIAL_LABEL = 'First 30 days free for verified hotels';
const AFTER_TRIAL_LABEL = `Then $${PAYMENT_PRICE}/month — charged automatically each month`;

const PRICE_IDS = (process.env.NEXT_PUBLIC_PRICE_IDS || '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

function PaymentDetails({ col, setStep, onCompleteSetup, hotelFormData, isSubmitting }) {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState(
    PRICE_IDS.length > 0 ? PRICE_IDS[0] : ''
  );
  console.log(PRICE_IDS,"hotelFormData")
  console.log(selectedPriceId,"hotelFormData")
  console.log(hotelFormData,"hotelFormData")
  console.log(isSubmitting,"hotelFormData")
  console.log(col,"hotelFormData")
  console.log(setStep,"hotelFormData")
  console.log(onCompleteSetup,"hotelFormData")
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
      const idempotencyKey = `checkout-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;

      const hotelToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('phloii_token_auth')
          : null;

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
                      ? 'Phloii Verified – first 30 days free, then $9.99/month'
                      : `Plan ${index + 1} – first 30 days free, then $9.99/month`}
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

