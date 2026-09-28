import ctaImage from '../assets/images/cta/cta-main.jpg'

export default function CTA() {
  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      <img
        src={ctaImage}
        alt="Warm minimalist living room in evening light"
        width={2000}
        height={1200}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/60" />

      <div className="relative z-10 max-w-3xl mx-auto text-center text-ivory">
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-6">
          Have a Space in Mind?
        </h2>
        <p className="font-sans text-lg md:text-xl text-ivory/80 mb-10">
          Let's turn it into something worth coming home to.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@aurenzainteriors.com"
            className="bg-ivory text-charcoal px-7 py-3 text-sm tracking-wide hover:bg-champagne transition-colors duration-300"
          >
            Start a Conversation
          </a>
          <a
            href="mailto:hello@aurenzainteriors.com?subject=Consultation%20Request"
            className="border border-ivory text-ivory px-7 py-3 text-sm tracking-wide hover:bg-ivory hover:text-charcoal transition-colors duration-300"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
