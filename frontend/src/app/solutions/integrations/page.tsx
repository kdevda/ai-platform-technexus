"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';

export default function IntegrationsPage() {
  // Categories of integrations
  const categories = [
    { id: 'crm' as const, name: 'CRM & Sales' },
    { id: 'data' as const, name: 'Data & Analytics' },
    { id: 'communication' as const, name: 'Communication' },
    { id: 'payments' as const, name: 'Payment Processing' },
    { id: 'credit' as const, name: 'Credit & Risk' },
    { id: 'marketing' as const, name: 'Marketing' },
    { id: 'document' as const, name: 'Document Management' },
    { id: 'chatbots' as const, name: 'AI & Chatbots' },
    { id: 'compliance' as const, name: 'Compliance & Reporting' },
  ];

  type CategoryId = typeof categories[number]['id'];

  // All integrations organized by category
  const integrations: Record<CategoryId, Array<{ name: string, logo: string, description: string }>> = {
    crm: [
      { name: 'Salesforce', logo: '/images/integrations/salesforce.svg', description: 'Leading CRM platform with comprehensive customer management' },
      { name: 'HubSpot', logo: '/images/integrations/hubspot.svg', description: 'All-in-one inbound marketing, sales, and service platform' },
      { name: 'Microsoft Dynamics', logo: '/images/integrations/dynamics.svg', description: 'Business applications that streamline customer engagement' },
      { name: 'Zoho CRM', logo: '/images/integrations/zoho.svg', description: 'Customer relationship management software for businesses of all sizes' },
    ],
    data: [
      { name: 'Snowflake', logo: '/images/integrations/snowflake.svg', description: 'Cloud data platform for storage and analytics' },
      { name: 'Tableau', logo: '/images/integrations/tableau.svg', description: 'Interactive data visualization tools' },
      { name: 'Power BI', logo: '/images/integrations/powerbi.svg', description: 'Business analytics service by Microsoft' },
      { name: 'Looker', logo: '/images/integrations/looker.svg', description: 'Business intelligence and big data analytics platform' },
    ],
    communication: [
      { name: 'Twilio', logo: '/images/integrations/twilio.svg', description: 'Cloud communications platform for messaging, voice, and video' },
      { name: 'SendGrid', logo: '/images/integrations/sendgrid.svg', description: 'Email delivery service for transactional emails' },
      { name: 'Slack', logo: '/images/integrations/slack.svg', description: 'Business communication platform for team collaboration' },
      { name: 'Zoom', logo: '/images/integrations/zoom.svg', description: 'Video conferencing and messaging platform' },
    ],
    payments: [
      { name: 'Stripe', logo: '/images/integrations/stripe.svg', description: 'Online payment processing for internet businesses' },
      { name: 'PayPal', logo: '/images/integrations/paypal.svg', description: 'Digital payments platform for online money transfers' },
      { name: 'Square', logo: '/images/integrations/square.svg', description: 'Financial services and mobile payment company' },
      { name: 'Plaid', logo: '/images/integrations/plaid.svg', description: 'API for financial account access and data aggregation' },
    ],
    credit: [
      { name: 'Experian', logo: '/images/integrations/experian.svg', description: 'Consumer credit reporting company' },
      { name: 'Equifax', logo: '/images/integrations/equifax.svg', description: 'Credit bureau collecting information on consumer creditworthiness' },
      { name: 'TransUnion', logo: '/images/integrations/transunion.svg', description: 'Global credit information and information management services provider' },
      { name: 'CLEAR', logo: '/images/integrations/clear.svg', description: 'Advanced risk assessment and credit scoring technology' },
    ],
    marketing: [
      { name: 'Mailchimp', logo: '/images/integrations/mailchimp.svg', description: 'Marketing automation platform for email campaigns' },
      { name: 'Marketo', logo: '/images/integrations/marketo.svg', description: 'Marketing automation software for account-based marketing' },
      { name: 'Constant Contact', logo: '/images/integrations/constantcontact.svg', description: 'Email marketing solution for small businesses' },
      { name: 'Klaviyo', logo: '/images/integrations/klaviyo.svg', description: 'Marketing automation platform focused on e-commerce' },
    ],
    document: [
      { name: 'DocuSign', logo: '/images/integrations/docusign.svg', description: 'Electronic signature technology and digital transaction management' },
      { name: 'Adobe Document Cloud', logo: '/images/integrations/adobe.svg', description: 'Document services including Adobe Acrobat and Adobe Sign' },
      { name: 'Box', logo: '/images/integrations/box.svg', description: 'Cloud content management and file sharing service' },
      { name: 'Dropbox', logo: '/images/integrations/dropbox.svg', description: 'File hosting service with personal cloud and file synchronization' },
    ],
    chatbots: [
      { name: 'OpenAI', logo: '/images/integrations/openai.svg', description: 'Advanced AI research and deployment with GPT models' },
      { name: 'Anthropic', logo: '/images/integrations/anthropic.svg', description: 'AI assistant with Claude for natural language processing' },
      { name: 'Cohere', logo: '/images/integrations/cohere.svg', description: 'Natural language processing API for applications' },
      { name: 'Langchain', logo: '/images/integrations/langchain.svg', description: 'Framework for developing applications with language models' },
    ],
    compliance: [
      { name: 'ComplyAdvantage', logo: '/images/integrations/complyadvantage.svg', description: 'AML data and technology to detect financial crime risks' },
      { name: 'Hummingbird', logo: '/images/integrations/hummingbird.svg', description: 'Anti-money laundering compliance for financial services' },
      { name: 'Alloy', logo: '/images/integrations/alloy.svg', description: 'Identity verification and compliance platform' },
      { name: 'Persona', logo: '/images/integrations/persona.svg', description: 'Identity verification infrastructure platform' },
    ],
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-grid-white/20"></div>
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center md:text-left max-w-4xl mx-auto md:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Connect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Entire</span> Ecosystem
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto md:mx-0">
              Seamlessly integrate Technexus with your preferred tools and services. Our platform connects with over 50 leading solutions to enhance your loan management experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="#integration-categories" className="bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Browse Integrations
              </Link>
              <Link href="/contact" className="bg-transparent border border-white text-white py-3 px-6 rounded-lg font-medium hover:bg-white/10 transition-colors">
                Request an Integration
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">9</div>
              <div className="text-gray-300">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15min</div>
              <div className="text-gray-300">Avg Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section id="integration-categories" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Integration Categories</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Browse our wide range of integrations by category to find exactly what you need for your loan management workflow.
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="inline-flex space-x-2 min-w-full px-4">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="inline-block whitespace-nowrap py-2 px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>

          {/* Integration Listings */}
          {categories.map((category) => (
            <div key={category.id} id={category.id} className="mt-16 scroll-mt-24">
              <h3 className="text-2xl font-bold mb-8">{category.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {integrations[category.id].map((integration) => (
                  <div key={integration.name} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg p-2 flex items-center justify-center mb-4">
                      <div className="text-lg font-semibold text-black">{integration.name.substring(0, 2)}</div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{integration.name}</h4>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{integration.description}</p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Easy setup</span>
                      <Link 
                        href={`/platform/admin/integrations-hub?category=${category.id}&integration=${integration.name}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Configure &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">How Integration Works</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Setting up an integration with Technexus is simple and straightforward, typically taking less than 15 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-100 text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Select Integration</h3>
              <p className="text-gray-600">Choose from our library of pre-built integrations or request a custom integration.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-100 text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Connect Accounts</h3>
              <p className="text-gray-600">Authenticate your accounts with secure OAuth or API key connections.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-100 text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Configure & Go</h3>
              <p className="text-gray-600">Set up data mapping, automation rules, and start using the integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-2">How secure are these integrations?</h3>
              <p className="text-gray-600">All our integrations use OAuth 2.0 or secure API key storage with encryption at rest and in transit. We never store credentials in plain text and follow SOC 2 compliance standards.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Can I request a custom integration?</h3>
              <p className="text-gray-600">Yes! If you don't see an integration you need, contact our team and we'll evaluate building it for you or provide guidance on using our open API.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Do integrations cost extra?</h3>
              <p className="text-gray-600">Basic integrations are included in all plans. Premium integrations with advanced features may require higher tier plans or additional fees.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-2">How often is data synced?</h3>
              <p className="text-gray-600">Most integrations sync in real-time or near real-time. Some integrations use scheduled syncs that run every 15 minutes to 24 hours, depending on the integration type.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="inline-flex items-center bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Have more questions? Contact us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to connect your tech stack?</h2>
              <p className="mt-4 text-gray-300 text-lg">
                Get started with integrations that will transform your loan management workflow and boost efficiency across your organization.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register" className="bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Start Free Trial
                </Link>
                <Link href="/contact" className="bg-transparent border border-white py-3 px-6 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Talk to Sales
                </Link>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="text-xl font-bold mb-4">Enterprise Integration Services</div>
              <p className="text-gray-300 mb-6">
                Need complex integrations or custom development? Our enterprise team can help with:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom API development
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Legacy system integration
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Data migration services
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom workflow automation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 