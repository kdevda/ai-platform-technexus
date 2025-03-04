"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';

export default function PressPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI-Powered Lending: Balancing Automation with Human Touch",
      date: "June 15, 2024",
      excerpt: "As lending institutions embrace AI, finding the right balance between algorithmic efficiency and human judgment becomes crucial. We explore how lenders can leverage AI while maintaining the personal connection that borrowers value.",
      author: "Aisha Chen, CTO",
      category: "AI & Machine Learning",
      readTime: "7 min read",
      image: "/images/blog/ai-powered-lending.jpg"
    },
    {
      id: 2,
      title: "How Automation is Transforming the Loan Origination Process",
      date: "May 28, 2024",
      excerpt: "Loan origination has traditionally been paperwork-heavy and time-consuming. We examine how automation technologies are streamlining the process, reducing errors, and improving the experience for both lenders and borrowers.",
      author: "Michael Rodriguez, Product Director",
      category: "Automation",
      readTime: "5 min read",
      image: "/images/blog/loan-automation.jpg"
    },
    {
      id: 3,
      title: "Ethical Considerations in AI Lending Decisions",
      date: "April 10, 2024",
      excerpt: "As AI plays an increasingly important role in lending decisions, ensuring fairness and avoiding algorithmic bias is paramount. This article explores the ethical frameworks lenders should adopt when implementing AI-driven decision systems.",
      author: "Dr. Sarah Johnson, Ethics Advisor",
      category: "Ethics & Compliance",
      readTime: "9 min read",
      image: "/images/blog/ethical-ai.jpg"
    },
    {
      id: 4,
      title: "The Role of Open Banking in Modern Lending Platforms",
      date: "March 5, 2024",
      excerpt: "Open banking is revolutionizing how financial data is shared and utilized. We discuss how this paradigm shift enables more accurate risk assessment, personalized loan offerings, and a smoother application process.",
      author: "David Thompson, Integration Specialist",
      category: "Open Banking",
      readTime: "6 min read",
      image: "/images/blog/open-banking.jpg"
    },
    {
      id: 5,
      title: "Financial Inclusion Through Technology: Reaching Underserved Borrowers",
      date: "February 14, 2024",
      excerpt: "Traditional lending methods often exclude individuals with limited credit history. This post explores how AI and alternative data can help lenders safely extend credit to underserved populations while managing risk effectively.",
      author: "Maya Patel, Financial Inclusion Lead",
      category: "Financial Inclusion",
      readTime: "8 min read",
      image: "/images/blog/financial-inclusion.jpg"
    },
    {
      id: 6,
      title: "Blockchain's Role in Securing Modern Lending Platforms",
      date: "October 22, 2024",
      excerpt: "This post examines how blockchain technology can enhance security, transparency, and efficiency in lending operations while reducing fraud risks and improving audit capabilities.",
      author: "Kevin Zhang, Security Architect",
      category: "Blockchain & Security",
      readTime: "7 min read",
      image: "/images/blog/blockchain-security.jpg"
    },
    {
      id: 7,
      title: "Predictive Analytics: Forecasting Loan Performance in Uncertain Times",
      date: "November 18, 2024",
      excerpt: "In times of economic volatility, accurate forecasting becomes crucial. This article explores how advanced predictive analytics can help lenders anticipate loan performance trends and adjust their strategies accordingly.",
      author: "Jennifer Liu, Data Science Lead",
      category: "Data Science",
      readTime: "10 min read",
      image: "/images/blog/predictive-analytics.jpg"
    },
    {
      id: 8,
      title: "The API Economy: Building Seamless Lending Ecosystems",
      date: "December 12, 2024",
      excerpt: "APIs are transforming how lending platforms interact with other services. We discuss strategies for building robust API ecosystems that enhance functionality, improve user experience, and open new market opportunities.",
      author: "Carlos Mendez, Integration Director",
      category: "API & Integration",
      readTime: "6 min read",
      image: "/images/blog/api-ecosystems.jpg"
    },
    {
      id: 9,
      title: "Generative AI: The Next Frontier in Personalized Lending",
      date: "January 25, 2025",
      excerpt: "Generative AI is moving beyond content creation to transform financial services. This blog explores how lenders can leverage this technology to develop highly personalized loan products and communication strategies.",
      author: "Aisha Chen, CTO",
      category: "AI & Machine Learning",
      readTime: "8 min read",
      image: "/images/blog/generative-ai.jpg"
    },
    {
      id: 10,
      title: "Zero-Knowledge Proofs: Enhancing Privacy in Lending Verification",
      date: "March 15, 2025",
      excerpt: "Privacy concerns in lending are growing. This post explores how zero-knowledge proof technology can enable lenders to verify borrower information without accessing sensitive personal data, transforming the privacy landscape.",
      author: "Dr. Alex Kim, Research Director",
      category: "Privacy & Security",
      readTime: "11 min read",
      image: "/images/blog/zero-knowledge-proofs.jpg"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16 md:py-24 relative overflow-hidden bg-grid-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
              Press & Insights
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mt-6">
              The latest news, insights, and thought leadership from Technexus.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section id="insights" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Latest Insights</h2>
            <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              In-depth perspectives on the technology transforming the lending industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="mr-3">{post.category}</span>
                    <span>•</span>
                    <span className="ml-3">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Want to stay updated with our latest insights and industry trends?
            </p>
            <a 
              href="#subscribe" 
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Subscribe to Our Newsletter
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section id="subscribe" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-8">
                Get the latest insights on lending technology, AI advancements, and fintech trends delivered to your inbox.
              </p>
            </div>
            
            <form className="mt-8 space-y-4 md:space-y-0 md:flex md:gap-4">
              <div className="flex-grow">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                />
              </div>
              <button 
                type="submit" 
                className="w-full md:w-auto px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              By subscribing, you agree to our Privacy Policy and consent to receive relevant content from Technexus.
            </p>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Media Contact</h2>
            <p className="text-gray-600 text-lg mb-8">
              For media inquiries, expert commentary, or interview requests, please reach out to our team. We're happy to provide insights on lending technology, AI innovation, and fintech trends.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Contact Us
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 