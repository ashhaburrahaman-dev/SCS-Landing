import { Smile, Zap, Home, IndianRupee } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <Smile className="h-8 w-8" />,
    title: 'Simple & Friendly Support',
    description: 'We are here to help you with a smile, no matter your technical skill level.',
  },
  {
    icon: <IndianRupee className="h-8 w-8" />,
    title: 'Affordable Charges',
    description: 'Get all digital services at pocket-friendly prices, without any hidden costs.',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Fast Service',
    description: 'We value your time. Get your work done quickly and efficiently.',
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: 'Near Your Home',
    description: 'Conveniently located in your neighborhood for all your urgent digital needs.',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose Us?</h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
            Your friendly neighborhood digital support point.
          </p>
        </div>
        <div className="mx-auto grid items-start gap-8 pt-12 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="grid gap-2 text-center transition-transform duration-300 hover:scale-105">
              <div className="flex justify-center items-center mb-4">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  {React.cloneElement(feature.icon)}
                </div>
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
