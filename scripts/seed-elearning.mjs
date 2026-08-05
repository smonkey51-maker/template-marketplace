/**
 * Crea i prodotti Stripe per la categoria E-learning & Corsi.
 * Esegui: node scripts/seed-elearning.mjs
 */
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const templates = [
  {
    id: "course-landing-page",
    name: "Online Course Landing Page",
    description:
      "Full landing page for an online course: hero, curriculum, instructor bio, testimonials and CTA with pricing.",
    price: 1299,
  },
  {
    id: "webinar-registration",
    name: "Webinar Registration Page",
    description:
      "Live webinar opt-in page with countdown timer, speaker bio, session agenda and email capture form.",
    price: 999,
  },
  {
    id: "course-curriculum-builder",
    name: "AI Course Curriculum Builder",
    description:
      "Structured AI prompt to generate a complete online course curriculum with modules, lessons, objectives and exercises.",
    price: 999,
  },
  {
    id: "student-success-story",
    name: "Student Success Story Template",
    description:
      "AI prompt to write compelling student case studies and testimonials that convert visitors into buyers.",
    price: 799,
  },
  {
    id: "course-email-welcome",
    name: "Course Welcome Email Sequence",
    description:
      "5-part onboarding email sequence for new students: from purchase confirmation to first quick win.",
    price: 1199,
  },
];

async function main() {
  console.log("Creazione prodotti E-learning su Stripe...\n");
  for (const tmpl of templates) {
    const product = await stripe.products.create({
      name: tmpl.name,
      description: tmpl.description,
      metadata: { templateId: tmpl.id, category: "elearning" },
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: tmpl.price,
      currency: "eur",
    });
    console.log(`${tmpl.name}`);
    console.log(`   id: "${tmpl.id}"`);
    console.log(`   stripePriceId: "${price.id}"\n`);
  }
  console.log("Fatto! Copia i Price ID sopra nel file lib/templates.ts");
}

main().catch(console.error);
