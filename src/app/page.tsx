import { HeroSection } from '@/components/landing/hero-section';
import { ServicesSection } from '@/components/landing/services-section';
import { WhyChooseUsSection } from '@/components/landing/why-choose-us-section';
import { LocationSection } from '@/components/landing/location-section';
import { ContactForm } from '@/components/landing/contact-form';
import { Footer } from '@/components/landing/footer';
import { WhatsAppButton } from '@/components/landing/whatsapp-button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <LocationSection />
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                Get Notified When We Open
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Leave your details below, and we&apos;ll send you an update on our grand opening!
              </p>
            </div>
            <div className="mx-auto max-w-xl mt-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
