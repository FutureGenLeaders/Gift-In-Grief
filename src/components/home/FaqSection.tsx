
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "Is this program right for fresh grief or only old losses?",
      answer: "Our approach works for both recent losses and grief you've carried for years. We meet you wherever you are in your journey with trauma-informed, gentle guidance that honors your timing and emotional capacity."
    },
    {
      question: "How is this different from therapy or counseling?",
      answer: "We complement professional support with self-guided emotional intelligence work and practical healing tools you can use daily. Our focus is on developing your emotional sovereignty and transforming grief into wisdom."
    },
    {
      question: "What if I don't want to share my story with others?",
      answer: "Your healing journey is completely private. You choose what to share and when, with full anonymity options. All community features are optional, and you can heal entirely privately if you prefer."
    },
    {
      question: "Can this help with complicated or traumatic loss?",
      answer: "Yes, our trauma-informed approach specifically addresses complex grief patterns with appropriate safety measures. We provide crisis support resources and clear guidance about when professional help is recommended."
    },
    {
      question: "How long does the healing process take?",
      answer: "Healing happens at your own pace. Our 81-session program can be completed over 9 months or longer, depending on your needs. Many users see significant shifts within the first few weeks of consistent practice."
    },
    {
      question: "What makes your approach different from other grief support?",
      answer: "We focus on transformation rather than just coping. Our approach combines ancient wisdom with modern emotional science to help you develop emotional sovereignty and transform pain into purpose and wisdom."
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl luxury-heading font-bold mb-6 text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-xl luxury-text leading-relaxed">
            Everything you need to know about beginning your healing journey
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-background border border-muted rounded-lg px-6 py-2">
              <AccordionTrigger className="text-primary luxury-heading text-lg font-semibold text-left hover:text-accent transition-colors duration-300 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="luxury-text text-base leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
