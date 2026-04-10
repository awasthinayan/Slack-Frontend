import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { VerifyEmailRequest } from '@/API/auth/auth';

export const VerifyEmailPage = () => {
  const [params] = useSearchParams();
  const [message, setMessage] = useState(
    'Click the button below to verify your email.'
  );
  const [success, setSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const email = params.get('email');
  const token = params.get('token');

  const handleVerifyEmail = async () => {
    if (!email || !token) {
      setHasAttempted(true);
      setSuccess(false);
      setMessage('Invalid verification link');
      return;
    }

    try {
      setIsVerifying(true);
      setHasAttempted(true);
      const response = await VerifyEmailRequest({ email, token });
      setSuccess(true);
      setMessage(response?.message || 'Email verified successfully');
    } catch (error) {
      setSuccess(false);
      setMessage(
        error?.response?.data?.message || 'Verification failed'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">
          {success ? 'Email verified' : 'Verification status'}
        </h1>
        <p className="mt-3 text-slate-600">{message}</p>
        {!success ? (
          <button
            type="button"
            onClick={handleVerifyEmail}
            disabled={isVerifying}
            className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </button>
        ) : null}
        {(success || hasAttempted) ? (
          <Link
            to="/signin"
            className="mt-6 ml-3 inline-block rounded-lg bg-slate-800 px-4 py-2 text-white cursor-pointer"
          >
            Go to sign in
          </Link>
        ) : null}
      </div>
    </div>
  );
};
