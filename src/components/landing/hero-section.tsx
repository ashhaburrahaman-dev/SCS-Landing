import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-2 fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-primary">
              Sahayata Cyber Support
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">Cyber Café & Digital Help Point</p>
          </div>
          <div className="space-y-3 fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="mx-auto max-w-[800px] text-2xl !leading-tight font-bold md:text-3xl text-primary/80">
              Launching Soon in Narayanpur – Baduria
            </p>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
              Internet, printing, online forms, job applications, recharges & all your daily digital needs under one
              roof.
            </p>
          </div>
          <div className="w-full max-w-sm space-x-2 pt-4 fade-in" style={{ animationDelay: '0.6s' }}>
            <Link href="#contact" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                Get Opening Updates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
