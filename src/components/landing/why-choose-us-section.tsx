import { Smile, Zap, Home, IndianRupee } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <Smile className="h-8 w-8" />,
    title: 'সহজ ও বন্ধুত্বপূর্ণ সহায়তা',
    description: 'আপনার প্রযুক্তিগত দক্ষতা যাই হোক না কেন, আমরা হাসিমুখে আপনাকে সাহায্য করার জন্য এখানে আছি।',
  },
  {
    icon: <IndianRupee className="h-8 w-8" />,
    title: 'সাশ্রয়ী মূল্যে পরিষেবা',
    description: 'কোনও লুকানো খরচ ছাড়াই পকেট-বান্ধব দামে সমস্ত ডিজিটাল পরিষেবা পান।',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'দ্রুত পরিষেবা',
    description: 'আমরা আপনার সময়ের মূল্য দিই। আপনার কাজ দ্রুত এবং দক্ষতার সাথে সম্পন্ন করুন।',
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: 'আপনার বাড়ির কাছে',
    description: 'আপনার সমস্ত জরুরি ডিজিটাল প্রয়োজনের জন্য আপনার পাড়ায় সুবিধাজনকভাবে অবস্থিত।',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">কেন আমাদের বেছে নেবেন?</h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
            আপনার বন্ধুত্বপূর্ণ প্রতিবেশী ডিজিটাল সহায়তা কেন্দ্র।
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
