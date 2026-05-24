import { R } from "@/components/Reveals";
import ContactForm from "@/components/ContactForm";
import { getSiteContent } from "@/lib/queries";

export const metadata = { title: "Contact — Tahir Umer" };
export const revalidate = 60;

export default async function ContactPage() {
  const { contact, settings } = await getSiteContent();

  return (
    <main className="page-pad">
      <R><span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>005 / Contact</span></R>
      <R d={0.1}><h1 className="page-title">{contact.title}</h1></R>
      <R d={0.15}>
        <p className="page-sub">{contact.sub}</p>
      </R>

      <ContactForm contact={contact} settings={settings} />
    </main>
  );
}
