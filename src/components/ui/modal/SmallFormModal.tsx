"use client";

export default function SmallFormModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div className="relative w-full max-w-md rounded-2xl 
      bg-[#0f0f0f] border border-white/10 
      shadow-2xl p-6 animate-[fadeIn_.3s_ease]">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition text-lg"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}