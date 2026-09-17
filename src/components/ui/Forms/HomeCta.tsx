"use client";

export default function HomeCta() {
  return (
    <div className="w-full max-w-md mx-auto">

      <h2 className="text-xl font-semibold mb-4 text-center">
        Contact Us
      </h2>

      <form
        action="https://forms.zohopublic.in/dluxtech/form/ContactUs/formperma/31chFm8VXcXIgilsROO-K9qJZ1vauQDQ-ITFT9TZAbU/htmlRecords/submit"
        method="POST"
        acceptCharset="UTF-8"
        encType="multipart/form-data"
        className="space-y-3"
      >
        {/* hidden fields (required by Zoho) */}
        <input type="hidden" name="zf_referrer_name" value="" />
        <input type="hidden" name="zf_redirect_url" value="" />
        <input type="hidden" name="zc_gad" value="" />

        {/* First + Last */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="Name_First"
            placeholder="First Name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/40"
          />

          <input
            type="text"
            name="Name_Last"
            placeholder="Last Name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/40"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="Email"
          placeholder="Email"
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/40"
        />

        {/* Phone */}
        <input
          type="tel"
          name="PhoneNumber_countrycode"
          placeholder="Phone"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/40"
        />

        {/* Message */}
        <textarea
          name="MultiLine"
          rows={3}
          placeholder="Message"
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/40 resize-none"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 text-sm rounded-full font-medium bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo hover:opacity-90 transition"
        >
          Send
        </button>
      </form>

    </div>
  );
}