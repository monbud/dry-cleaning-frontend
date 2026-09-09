import { notFound } from 'next/navigation';
import BusinessPage, { generateMetadata as businessMetadata } from '../businesses/[businessId]/page';
import { isBusinessId } from '../../lib/business-url';
import Link from 'next/link';
import { PublicNav, Footer } from '../../components/ui';
import DeleteAccount from '../../components/delete-account';
const policies = {
  terms: { title: 'Terms of use', sections: [
    ['About the platform', 'FinBud is a business management platform for Nigerian dry cleaners, owned by FinBud Technologies Limited. Each participating dry cleaner is responsible for its own clothing-care services, prices, customer communications, and fulfilment.'],
    ['Your account and workspace', 'Provide accurate information, protect your sign-in details, and access only businesses and records you are authorised to manage. Do not use the platform for fraud, money laundering, unlawful transfers, or fabricated business activity.'],
    ['Subscriptions', 'The initial plan includes a 14-day trial for each new business. Renewal is ₦1,000 per business for 30 days, paid manually through Paystack when configured. Expiry prevents new records; existing records remain accessible. Payment-provider charges, where applicable, are shown at checkout.'],
    ['Clothing records and disputes', 'Photos and condition notes support a shared record of the garments received. They do not guarantee that every defect was captured or determine liability by themselves. Customers should review the recorded condition at drop-off and raise concerns promptly with the dry cleaner.'],
    ['Payments', 'FinBud does not offer a general-purpose wallet. An expense entry records a payment; it does not send money. Manually recorded customer payments are confirmed by the business, not independently verified by the platform. Online payments are available only where configured and approved.'],
    ['Ownership', 'The FinBud brand, platform designs, and original software belong to FinBud Technologies Limited. Using the platform does not transfer ownership of those materials. Personal-data rights continue to apply to customers and account holders.'],
  ] },
  privacy: { title: 'Privacy policy', sections: [
    ['Information used by the platform', 'The application stores account names and email addresses, business details, customer contact information, order details, garment photographs, condition notes, status histories, and financial records. Passwords are hashed. Payment card details are handled by the payment provider rather than stored by this application.'],
    ['Why information is used', 'Information supports account access, returning-customer identification, pricing, clothing care, status tracking, payment reconciliation, and dispute handling. The final policy must identify the applicable lawful bases for each purpose and the responsibilities of FinBud and participating businesses.'],
    ['Visibility and sharing', 'Business owners can access their own businesses’ records. Public listings are optional and display business contact and location details. A private tracking link reveals limited order information to anyone holding it; customers should not share it publicly. It does not expose customer contact information, private garment photographs, or staff identifiers.'],
    ['Service providers', 'Paystack supports configured payment services and Mailjet supports password-reset emails. Hosting and database providers must be identified before launch, along with any international data transfers and their safeguards. This preview uses Google Fonts for typography, which makes requests to Google from the browser.'],
    ['Retention and deletion', 'Account deletion removes the sign-in account and its sessions. Business archiving hides the business; historical business, clothing, and financial records remain stored in this version. A reviewed retention schedule and a process for customer access, correction, and erasure requests must be implemented before public launch. No automatic retention purge is currently enabled.'],
    ['Privacy choices', 'Collect only details necessary for the service, explain clothing photographs to customers, and avoid including faces or unrelated personal information. Customer data requests should be addressed with the dry cleaner and the platform’s designated privacy contact once that contact is published.'],
    ['Cookies', 'The platform uses an HTTP-only session cookie to keep account holders signed in. No advertising or analytics cookies are included in this version.'],
  ] },
  refunds: { title: 'Refunds & clothing concerns', sections: [
    ['Two different services', 'A FinBud subscription pays for access to the software. A laundry payment pays the selected dry cleaner for clothing-care services. Refund requests must be assessed against the relevant service and transaction.'],
    ['Subscription concerns', 'For duplicate subscription charges or failed activation after a confirmed payment, retain the Paystack reference and report the issue to FinBud through the support contact that will be published before launch. The platform currently requires manual renewal and does not automatically debit your account.'],
    ['Laundry-service concerns', 'Contact the dry cleaner about cancellations, incomplete services, missing clothes, or damage. Provide the order reference and any relevant evidence. Recorded garment conditions and photos can support the review. Each business needs to communicate its reviewed service terms before accepting orders.'],
    ['Processing refunds', 'Refunds require review and are not automated in this version. Where a payment was processed through Paystack, an authorised operator should handle approved refunds through the provider against the original transaction. Timelines depend on the provider and payment method; this draft makes no guaranteed refund-time promise.'],
  ] },
};
export async function generateMetadata({ params }) { const { policy } = await params; if (isBusinessId(policy)) return businessMetadata({ params: Promise.resolve({ businessId: policy }) }); return { title: policies[policy]?.title || 'Delete account', robots: { index: false, follow: false } }; }
export default async function Page({ params }) {
  const { policy } = await params;
  if (isBusinessId(policy)) return BusinessPage({ params: Promise.resolve({ businessId: policy }) });
  if (!policies[policy] && policy !== 'delete-account') notFound();
  const content = policies[policy];
  return <><PublicNav/><main className="public-page policy-page"><span className="eyebrow">FinBud Technologies Limited</span><h1>{content?.title || 'Delete your account'}</h1>{content ? content.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>) : <><p>You can delete your owner account here. First, complete outstanding orders and archive each business in <Link href="/dashboard">Business settings</Link>.</p><p>Deleting your account removes your login profile and sessions. Archived business records, customer records, photographs, and transactions remain stored in this version. This is not a request to erase every historical business record.</p><p>Customers without an owner account should contact their dry cleaner about their personal records. A platform-wide data-request process must be finalised before launch.</p><DeleteAccount/></>}</main><Footer/></>;
}
