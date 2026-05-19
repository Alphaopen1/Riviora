import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#0B1F3A] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-4">
          Erreur 404
        </p>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
        <p className="text-white/60 text-xl mb-10 max-w-md">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="bg-[#C9A96E] text-[#0B1F3A] font-bold px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300"
        >
          Retour à l&apos;accueil
        </Link>
      </body>
    </html>
  );
}
