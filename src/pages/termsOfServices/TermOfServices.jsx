import React from "react";

const TermsOfService = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-zinc-700">
      <h1 className="text-3xl font-black text-zinc-900 mb-6">
        Terms of Service
      </h1>

      <p className="text-sm mb-6 text-zinc-500">
        Effective Date: January 1, 2026
      </p>

      <p className="text-sm leading-relaxed mb-6">
        Welcome to Lilkami. By accessing or using this website, you agree to be
        bound by these Terms of Service. If you do not agree with any part of
        these terms, please discontinue use of the website.
      </p>

      <h2 className="text-xl font-bold text-zinc-900 mb-3">
        Use of the Website
      </h2>
      <p className="text-sm leading-relaxed mb-6">
        Lilkami provides anime-style wallpapers and fan-made digital art for
        personal, non-commercial use only. You agree not to redistribute,
        sell, or exploit any content from this website.
      </p>

      <h2 className="text-xl font-bold text-zinc-900 mb-3">
        Intellectual Property Rights
      </h2>
      <p className="text-sm leading-relaxed mb-6">
        Lilkami does not claim ownership over third-party artwork, anime
        characters, or trademarks. All such content belongs to its respective
        owners.
      </p>

      <h2 className="text-xl font-bold text-zinc-900 mb-3">
        User Submissions
      </h2>
      <p className="text-sm leading-relaxed mb-6">
        By submitting content to Lilkami, you confirm that you have the right
        to do so and grant Lilkami a non-exclusive right to display the content.
      </p>

      <h2 className="text-xl font-bold text-zinc-900 mb-3">
        Disclaimer
      </h2>
      <p className="text-sm leading-relaxed mb-6">
        All content is provided "as is" without warranties of any kind.
        Use of the website is at your own risk.
      </p>

      <h2 className="text-xl font-bold text-zinc-900 mb-3">
        Limitation of Liability
      </h2>
      <p className="text-sm leading-relaxed mb-6">
        Lilkami shall not be liable for any damages resulting from the use of
        the website or its content.
      </p>

      <h2 className="text-xl font-bold text-zinc-900 mb-3">
        Contact Us
      </h2>
      <p className="text-sm">
        For questions regarding these Terms, contact us at{" "}
        <span className="font-semibold">support@lilkami.com</span>.
      </p>
    </main>
  );
};

export default TermsOfService;
