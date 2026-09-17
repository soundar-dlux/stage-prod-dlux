"use client";

export default function ExpertFormCard() {
  return (
    <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-5 tracking-wide">
        Talk to Experts
      </h3>

      {/* Form */}
      <form
        action="https://forms.zohopublic.in/dluxtech/form/SalesforceCommerceCloud4/formperma/ikVeF81Xr2aRUyk1ZNICyUitcKCyy89wr_QwHMUPKhQ/htmlRecords/submit"
        method="POST"
        className="space-y-4"
      >

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="SingleLine"
            required
            placeholder=" "
            className="peer w-full px-4 py-2.5 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-orange-500"
          />
          <label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-500 bg-white px-1 rounded">
            Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="Email"
            required
            placeholder=" "
            className="peer w-full px-4 py-2.5 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-orange-500"
          />
          <label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-500 bg-white px-1 rounded">
            Email
          </label>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            name="SingleLine1"
            required
            rows={3}
            placeholder=" "
            className="peer w-full px-4 py-2.5 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
          <label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-500 bg-white px-1 rounded">
            Message
          </label>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:opacity-90 transition"
        >
          Get Free Consultation
        </button>
      </form>

      {/* Footer */}
      <p className="mt-4 text-xs text-gray-400 text-center">
        We’ll get back within 24 hrs
      </p>
    </div>
  );
}