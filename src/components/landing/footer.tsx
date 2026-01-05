import Image from 'next/image';
import { getAssetPath } from '@/lib/asset-path';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-muted py-6">
      <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground flex flex-col items-center gap-4">
        <Image src={getAssetPath('/logo.png')} alt="Sahayata Cyber Support" width={250} height={75} />
        <p>শীঘ্রই খুলছে – সংযুক্ত থাকুন</p>
        <p className="text-xs mt-4">© {currentYear} সহায়তা সাইবার সাপোর্ট। সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
}
