import Link from "next/link";



export default function PrivacyPolicy ()  {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-20 text-white">

        {/* PAGE HEADER */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            This Privacy Policy explains how DLUX TECH CORP PTY LTD
            (ABN 69 629 760 523) collects, uses, discloses and protects your
            personal information.
          </p>
        </header>

        <div className="space-y-16 text-[15px] md:text-[16px] leading-relaxed">

          {/* INTRODUCTION */}
          <section className="space-y-6">
            <p>
              In this Privacy Policy, the terms “DLUX”, “we”, “our”, or “us”
              refer to DLUX TECH CORP PTY LTD (ABN 69 629 760 523).
            </p>

            <p>
              We adhere to the Privacy Act 1988 (Cth), including the
              Australian Privacy Principles, and comply with all applicable
              Australian privacy and data protection laws.
            </p>

            <p>
              By using our website (www.dluxtech.com) or providing personal
              information to us, you agree to the collection, use, and
              disclosure of your information in accordance with this policy.
            </p>
          </section>

          {/* TYPES OF PERSONAL INFORMATION */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Types of Personal Information Collected
            </h2>

            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Contact Details:</strong> Name, address, phone number,
                email address and related contact information.
              </li>

              <li>
                <strong>Payment Information:</strong> Credit card or bank
                details for transactions.
              </li>

              <li>
                <strong>Business-Related Information:</strong> Information about
                employees, suppliers, business associates and partners.
              </li>

              <li>
                <strong>Services Data:</strong> Information obtained from
                third-party suppliers such as property ownership records,
                company shareholdings, directorships and verification data.
              </li>

              <li>
                <strong>Meta Data:</strong> IP addresses and usage data
                collected through logging technologies.
              </li>
            </ul>

            <p className="mt-6">
              Providing personal information is not mandatory; however,
              failure to provide required information may prevent us from
              delivering certain services.
            </p>
          </section>

          {/* COLLECTION AND STORAGE */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Collection and Storage of Personal Information
            </h2>

            <p className="mb-4">
              We collect personal information from:
            </p>

            <ul className="list-decimal pl-6 space-y-3">
              <li>Direct interactions and website forms</li>
              <li>Our clients and integration partners</li>
              <li>Third-party suppliers and government databases</li>
              <li>Automatic logging technologies and device data</li>
            </ul>

            <p className="mt-6">
              For details on cookies and tracking technologies, please refer to
              our <Link href="/cookie-policy" className="text-orange-400 underline">Cookie Notice </Link>.
            </p>
          </section>

          {/* PURPOSE */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Purposes of Personal Information Handling
            </h2>

            <ul className="list-decimal pl-6 space-y-3">
              <li>Deliver requested products and services</li>
              <li>Process payments</li>
              <li>Improve business operations</li>
              <li>Marketing and communications</li>
              <li>Legal compliance and regulatory requirements</li>
            </ul>
          </section>

          {/* DISCLOSURE */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Disclosure of Personal Information
            </h2>

            <p>
              We may disclose personal information to reseller partners,
              contractors, subcontractors, vendors, and professional advisers
              under strict contractual safeguards.
            </p>
          </section>

          {/* INTERNATIONAL */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              International Disclosure
            </h2>

            <p>
              Personal information is stored within Australia and India.
              Access may be granted under secure and compliant frameworks.
            </p>
          </section>

          {/* SECURITY */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Protection of Personal Information
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>Firewalls and secure network infrastructure</li>
              <li>Anti-virus protection</li>
              <li>Employee cybersecurity training</li>
              <li>Restricted physical access controls</li>
              <li>Data de-identification and destruction policies</li>
            </ul>
          </section>

          {/* ACCESS & CORRECTION */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Access and Correction Requests
            </h2>

            <p>
              You may request access to or correction of your personal
              information by contacting us. We respond promptly in accordance
              with the Privacy Act.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Contact Us
            </h2>

            <address className="not-italic space-y-2">
              <p>Privacy Team</p>
              <p>DLUX TECH CORP PTY LTD</p>
              <p>Suite-3, Level 2, 9 George Street</p>
              <p>Parramatta CBD, Sydney - NSW 2150</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@dluxtech.com"
                  className="text-orange-400 underline"
                >
                  privacy@dluxtech.com
                </a>
              </p>
            </address>
          </section>

        </div>
      </section>
    </>
  );
}
