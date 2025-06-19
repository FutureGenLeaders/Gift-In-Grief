
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "California",
      quote: "This program didn't just help me cope with losing my husband - it transformed how I understand myself and my capacity for healing. I've found purpose in my pain.",
      rating: 5
    },
    {
      name: "Michael R.",
      location: "New York", 
      quote: "After losing my job and sense of identity, I thought I was broken. This approach helped me rebuild myself stronger than before. The emotional sovereignty work changed everything.",
      rating: 5
    },
    {
      name: "Jennifer L.",
      location: "Texas",
      quote: "The 81 sessions met me exactly where I was in my grief. Each one built on the last, creating real transformation rather than just temporary relief.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent">
            Real Stories of Transformation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how others have transformed their deepest pain into profound wisdom and strength
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-yellow-600/50 transition-all duration-300">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-600 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-white font-light">
                {testimonial.name}
                <span className="text-gray-400 ml-2">{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
