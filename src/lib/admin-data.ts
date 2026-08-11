import { connectDB } from "./mongodb";
import ProjectModel from "./models/Project";
import BuilderModel from "./models/Builder";
import TestimonialModel from "./models/Testimonial";
import FAQModel from "./models/FAQ";
import GalleryModel from "./models/Gallery";
import BrochureModel from "./models/Brochure";
import ContactModel from "./models/Contact";
import SEOModel from "./models/SEO";
import { projects as staticProjects } from "@/data/projects";
import { builders as staticBuilders } from "@/data/builders";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import { homeFaqs, nriFaqs } from "@/data/faqs";
import siteConfig from "@/config/site";
import { seo } from "@/data/seo";

export async function seedAllData() {
  await connectDB();
  const results: string[] = [];

  // Projects
  const pCount = await ProjectModel.countDocuments();
  if (pCount === 0 && staticProjects.length > 0) {
    for (const p of staticProjects) {
      await ProjectModel.create({ ...p, sortOrder: 0 });
    }
    results.push(`Seeded ${staticProjects.length} projects`);
  } else {
    results.push(`Projects: ${pCount} already exist`);
  }

  // Builders
  const bCount = await BuilderModel.countDocuments();
  if (bCount === 0 && staticBuilders.length > 0) {
    for (const b of staticBuilders) {
      const { projectCount, ...rest } = b;
      await BuilderModel.create(rest);
    }
    results.push(`Seeded ${staticBuilders.length} builders`);
  } else {
    results.push(`Builders: ${bCount} already exist`);
  }

  // Testimonials
  const tCount = await TestimonialModel.countDocuments();
  if (tCount === 0 && staticTestimonials.length > 0) {
    for (const t of staticTestimonials) {
      await TestimonialModel.create({ ...t, featured: false, sortOrder: 0 });
    }
    results.push(`Seeded ${staticTestimonials.length} testimonials`);
  } else {
    results.push(`Testimonials: ${tCount} already exist`);
  }

  // FAQs
  const fCount = await FAQModel.countDocuments();
  const allFaqs = [...homeFaqs, ...nriFaqs];
  if (fCount === 0 && allFaqs.length > 0) {
    for (const faq of allFaqs) {
      await FAQModel.create({ ...faq, featured: false, sortOrder: 0 });
    }
    results.push(`Seeded ${allFaqs.length} FAQs`);
  } else {
    results.push(`FAQs: ${fCount} already exist`);
  }

  // Gallery
  const gCount = await GalleryModel.countDocuments();
  if (gCount === 0) {
    const defaultGallery = [
      { title: "Project Overview", image: "/images/gallery/project-overview.svg", category: "projects", sortOrder: 0 },
      { title: "Clubhouse Design", image: "/images/gallery/clubhouse.svg", category: "projects", sortOrder: 1 },
      { title: "Landscaped Gardens", image: "/images/gallery/gardens.svg", category: "projects", sortOrder: 2 },
    ];
    for (const item of defaultGallery) {
      await GalleryModel.create(item);
    }
    results.push(`Seeded ${defaultGallery.length} gallery items`);
  } else {
    results.push(`Gallery: ${gCount} already exist`);
  }

  // Brochures
  const brCount = await BrochureModel.countDocuments();
  if (brCount === 0) {
    const brochures = staticProjects
      .filter((p) => p.brochureUrl)
      .map((p) => ({
        title: `${p.name} Brochure`,
        file: p.brochureUrl,
        project: p.slug,
        type: "brochure" as const,
        sortOrder: 0,
      }));
    for (const item of brochures) {
      await BrochureModel.create(item);
    }
    results.push(`Seeded ${brochures.length} brochures`);
  } else {
    results.push(`Brochures: ${brCount} already exist`);
  }

  // Contact
  const cCount = await ContactModel.countDocuments();
  if (cCount === 0) {
    await ContactModel.create({
      phone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      address: siteConfig.address.full || "",
      whatsapp: siteConfig.links.wa || "",
      workingHours: siteConfig.address.hours || "Mon-Sat: 10 AM - 7 PM",
    });
    results.push("Seeded contact settings");
  } else {
    results.push("Contact settings already exist");
  }

  // SEO
  const sCount = await SEOModel.countDocuments();
  const seoEntries = Object.entries(seo);
  if (sCount === 0 && seoEntries.length > 0) {
    for (const [page, data] of seoEntries) {
      await SEOModel.create({
        page,
        title: data.title || "",
        description: data.description || "",
        keywords: data.keywords || [],
      });
    }
    results.push(`Seeded ${seoEntries.length} SEO pages`);
  } else {
    results.push(`SEO: ${sCount} already exist`);
  }

  return results;
}
