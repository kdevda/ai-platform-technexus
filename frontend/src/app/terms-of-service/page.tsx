"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              Last updated: May 1, 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p>
              These Terms of Service ("Terms") govern your access to and use of the Technexus website, platform, and services (collectively, the "Services"). Please read these Terms carefully before using our Services.
            </p>
            
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">1. Definitions</h2>
            
            <p>
              <strong>"Technexus"</strong> (or "we," "our," or "us") refers to Technexus Inc., a corporation registered in Canada.
            </p>
            
            <p>
              <strong>"User"</strong> (or "you" or "your") refers to any individual or entity that accesses or uses our Services.
            </p>
            
            <p>
              <strong>"Content"</strong> refers to any information, data, text, software, graphics, messages, or other materials that are posted, uploaded, or otherwise made available through our Services.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">2. Account Registration and Security</h2>
            
            <p>
              To access certain features of our Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself as prompted by our registration process.
            </p>
            
            <p>
              You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
            
            <p>
              We reserve the right to disable your account if we determine, in our sole discretion, that you have violated these Terms.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">3. Use of Services</h2>
            
            <p>
              You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>Use the Services in any way that violates any applicable federal, provincial, local, or international law or regulation</li>
              <li>Use the Services to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
              <li>Use the Services to impersonate or attempt to impersonate Technexus, a Technexus employee, another user, or any other person or entity</li>
              <li>Attempt to bypass any security measures of the Services or access areas of the Services that you are not authorized to access</li>
              <li>Use any robot, spider, or other automatic device, process, or means to access the Services for any purpose, including monitoring or copying any of the material on the Services</li>
              <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful</li>
              <li>Attempt to damage, disable, overburden, or impair the Services or interfere with any other party's use of the Services</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">4. Intellectual Property Rights</h2>
            
            <p>
              The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, and the design, selection, and arrangement thereof) are owned by Technexus, its licensors, or other providers of such material and are protected by Canadian and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            
            <p>
              These Terms do not grant you any right, title, or interest in the Services or any content, features, or functionality of the Services.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">5. User Content</h2>
            
            <p>
              You retain all rights in, and are solely responsible for, any Content you submit, post, or display on or through the Services. By submitting, posting, or displaying Content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, and display such Content in connection with providing the Services to you.
            </p>
            
            <p>
              You represent and warrant that you have all necessary rights to grant us this license and that your Content does not violate any law or infringe the rights of any third party.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">6. Financial Terms</h2>
            
            <h3 className="text-xl font-bold mt-8 mb-2">6.1 Fees and Charges</h3>
            
            <p>
              We may charge fees for certain aspects of our Services. You agree to pay all fees and charges specified when you sign up for such Services. All fees and charges are non-refundable.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-2">6.2 Payment Terms</h3>
            
            <p>
              If you use our Services to apply for or manage loans or other financial products, additional terms and conditions may apply, including interest rates, repayment terms, and penalties for late payment. These terms will be provided to you as part of the application process and in your loan agreement.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-2">6.3 Taxes</h3>
            
            <p>
              You are responsible for paying all taxes associated with your use of the Services. If we are required to collect or pay taxes in connection with your use of the Services, those taxes will be charged to you.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">7. Disclaimer of Warranties</h2>
            
            <p className="uppercase">
              The Services are provided "as is" and "as available," without warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, title, non-infringement, or course of performance.
            </p>
            
            <p className="uppercase">
              Technexus does not warrant that the Services will function uninterrupted, secure, or available at any particular time or location, or that any errors or defects will be corrected.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">8. Limitation of Liability</h2>
            
            <p className="uppercase">
              In no event shall Technexus, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            
            <ol className="list-decimal ml-6 space-y-2 uppercase">
              <li>Your access to or use of or inability to access or use the Services</li>
              <li>Any conduct or content of any third party on the Services</li>
              <li>Any content obtained from the Services</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ol>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">9. Indemnification</h2>
            
            <p>
              You agree to defend, indemnify, and hold harmless Technexus, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">10. Termination</h2>
            
            <p>
              We may terminate or suspend your access to all or part of the Services, with or without notice, for any conduct that we, in our sole discretion, believe violates these Terms or is harmful to other users of the Services or third parties, or for any other reason.
            </p>
            
            <p>
              Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">11. Governing Law and Jurisdiction</h2>
            
            <p>
              These Terms and your use of the Services shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without giving effect to any choice or conflict of law provision or rule.
            </p>
            
            <p>
              Any legal suit, action, or proceeding arising out of or related to these Terms or the Services shall be instituted exclusively in the courts of the Province of Ontario, although we retain the right to bring any suit, action, or proceeding against you for breach of these Terms in your country of residence or any other relevant country.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">12. Changes to Terms</h2>
            
            <p>
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Services thereafter.
            </p>
            
            <p>
              Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">13. Miscellaneous</h2>
            
            <h3 className="text-xl font-bold mt-8 mb-2">13.1 Entire Agreement</h3>
            
            <p>
              These Terms constitute the entire agreement between you and Technexus regarding our Services and supersede all prior and contemporaneous written or oral agreements.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-2">13.2 Waiver</h3>
            
            <p>
              No waiver by Technexus of any term or condition set out in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-2">13.3 Severability</h3>
            
            <p>
              If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable, such provision shall be eliminated or limited to the minimum extent necessary so that the remaining provisions of the Terms will continue in full force and effect.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">14. Contact Information</h2>
            
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            
            <address className="not-italic mt-4">
              Technexus Inc.<br />
              40 King St W, 41st Floor
              <br />
              Toronto, ON M5H 3Y2
              <br />
              Canada
              <br />
              Email: legal@technexus.ca<br />
              Phone: (647) 554-4857
            </address>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-6">
              <Link href="/privacy-policy" className="text-black hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="/security" className="text-black hover:text-gray-700">
                Security
              </Link>
              <Link href="/compliance" className="text-black hover:text-gray-700">
                Compliance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 