import { Globe, Printer, FileText, Briefcase, Smartphone, Users } from 'lucide-react';
import React from 'react';

const services = [
  {
    icon: <Globe />,
    title: 'Internet Browsing',
  },
  {
    icon: <Printer />,
    title: 'Printing & Scan',
  },
  {
    icon: <FileText />,
    title: 'Online Form Fill-up',
  },
  {
    icon: <Briefcase />,
    title: 'Job Apply & Resume',
  },
  {
    icon: <Smartphone />,
    title: 'Mobile Recharge & Bill Pay',
  },
  {
    icon: <Users />,
    title: 'Email, Photo & Document Help',
  },
];

export function ServicesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Our Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide a wide range of digital services to make your life easier.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="flex flex-col items-center p-6 text-center border border-transparent-white/10 transition-all duration-300 rounded-xl bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                {React.cloneElement(service.icon, { className: 'h-8 w-8 text-primary' })}
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
