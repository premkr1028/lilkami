import React from "react";

const DMCA = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-zinc-700">
      <h1 className="text-3xl font-black text-zinc-900 mb-6">
        Copyright & DMCA Policy
      </h1>

      <p className="mb-6 text-sm leading-relaxed">
        Lilkami respects the intellectual property rights of others and expects its users to do the same.
        Lilkami is a fan-made anime wallpaper platform that hosts curated and user-submitted content
        intended for personal, non-commercial use only.
      </p>

      <p className="mb-8 text-sm leading-relaxed">
        We do not claim ownership over any third-party artwork, anime characters, or trademarks displayed
        on this website.
      </p>

      <h2 className="text-xl font-bold text-zinc-900 mb-4">
        Copyright Infringement Notice
      </h2>

      <p className="mb-6 text-sm leading-relaxed">
        If you are a copyright owner or an authorized agent and believe that content on Lilkami infringes
        your copyright, you may submit a DMCA takedown request. Valid requests will be reviewed and
        appropriate action will be taken promptly.
      </p>

      <h2 className="text-xl font-bold text-zinc-900 mb-4">
        Information Required
      </h2>

      <ul className="list-disc pl-6 mb-8 text-sm space-y-2">
        <li>Your full name and contact information</li>
        <li>Description of the copyrighted work</li>
        <li>Exact URL(s) of the allegedly infringing content</li>
        <li>A good-faith statement that the use is not authorized</li>
        <li>A statement of accuracy under penalty of perjury</li>
        <li>Your physical or electronic signature</li>
      </ul>

      <h2 className="text-xl font-bold text-zinc-900 mb-4">
        Submit a DMCA Request
      </h2>

      <p className="text-sm leading-relaxed">
        📧 Email: <span className="font-semibold">dmca@lilkami.com</span><br />
        📄 Subject: DMCA Takedown Request
      </p>

      <p className="mt-10 text-xs text-zinc-500">
        This policy may be updated at any time without prior notice.
      </p>
    </main>
  );
};

export default DMCA;
