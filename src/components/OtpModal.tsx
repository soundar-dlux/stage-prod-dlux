interface OtpModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OtpModal({ open, onClose }: OtpModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div
        className="bg-white p-6 rounded w-80"
        role="dialog"
        aria-modal="true"
        aria-labelledby="otp-title"
      >
        <h2 id="otp-title" className="text-lg font-bold mb-4">
          Verify OTP
        </h2>

        <p id="otp-hint" className="sr-only">
          Enter the one-time password (OTP) sent to your email or phone.
        </p>

        <label htmlFor="otp" className="sr-only">
          Enter OTP
        </label>

        <input
          id="otp"
          type="text"
          placeholder="Enter OTP"
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-describedby="otp-hint"
          aria-invalid={false}
          className="w-full border px-4 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button type="button" className="px-4 py-2 bg-black text-white rounded">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
