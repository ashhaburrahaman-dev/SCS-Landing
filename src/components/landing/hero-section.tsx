import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/asset-path';

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-2 fade-in" style={{ animationDelay: '0.2s' }}>
            <Image
              src={getAssetPath('/logo.png')}
              alt="Sahayata Cyber Support Logo"
              width={500}
              height={150}
              className="mx-auto"
              priority
            />
            <p className="text-lg text-muted-foreground md:text-xl pt-4">সাইবার ক্যাফে ও ডিজিটাল সহায়তা কেন্দ্র</p>
          </div>
          <div className="space-y-3 fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="mx-auto max-w-[800px] text-2xl !leading-tight font-bold md:text-3xl text-primary/80">
              শীঘ্রই আসছে নারায়ণপুর – বাদুড়িয়াতে
            </p>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
              ইন্টারনেট, প্রিন্টিং, অনলাইন ফর্ম, চাকরির আবেদন, রিচার্জ এবং আপনার সমস্ত ডিজিটাল চাহিদা এক ছাদের নিচে।
            </p>
          </div>
          <div className="w-full max-w-sm space-x-2 pt-4 fade-in" style={{ animationDelay: '0.6s' }}>
            <Link href="#contact" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                খোলার আপডেট পান
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
