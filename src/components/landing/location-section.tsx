import { MapPin } from 'lucide-react';

export function LocationSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <MapPin className="h-10 w-10 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Find Us At</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Narayanpur / Rudrapur area, Baduria, North 24 Parganas, West Bengal
          </p>
        </div>
      </div>
    </section>
  );
}
