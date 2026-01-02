export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-muted py-6">
      <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
        <p className="font-semibold text-lg text-foreground">Sahayata Cyber Support – Easy Digital Work Near You</p>
        <p>Opening Soon – Stay Connected</p>
        <p className="text-xs mt-4">© {currentYear} Sahayata Cyber Support. All rights reserved.</p>
      </div>
    </footer>
  );
}
