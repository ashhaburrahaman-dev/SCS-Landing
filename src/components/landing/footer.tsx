import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-muted py-6">
      <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground flex flex-col items-center gap-4">
        <Image src="/logo.png" alt="Sahayata Cyber Support" width={250} height={75} />
        <p>Opening Soon – Stay Connected</p>
        <p className="text-xs mt-4">© {currentYear} Sahayata Cyber Support. All rights reserved.</p>
      </div>
    </footer>
  );
}
