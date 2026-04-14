import React from "react";

const Contact = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-zinc-700">
      <h1 className="text-3xl font-black text-zinc-900 mb-6">
        Contact Us
      </h1>

      <p className="text-sm leading-relaxed mb-10 text-zinc-600">
        Have a question, feedback, or copyright concern?  
        We’re happy to help. Reach out to us using the information below.
      </p>

      {/* Contact Info */}
      <div className="mb-14 space-y-4 text-sm">
        <p>
          📧 <span className="font-semibold">Email:</span>{" "}
          <a
            href="mailto:support@lilkami.com"
            className="text-rose-500 hover:underline"
          >
            support@lilkami.com
          </a>
        </p>

        <p>
          📄 <span className="font-semibold">DMCA Requests:</span>{" "}
          <a
            href="mailto:dmca@lilkami.com"
            className="text-rose-500 hover:underline"
          >
            dmca@lilkami.com
          </a>
        </p>

        <p>
          ⏱ <span className="font-semibold">Response Time:</span>  
          Usually within 24–48 hours
        </p>
      </div>

      {/* Optional Contact Form */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-6">
          Send Us a Message
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              rows="4"
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white hover:bg-rose-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
