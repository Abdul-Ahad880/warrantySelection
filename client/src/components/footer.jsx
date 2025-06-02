import React from "react";

const Footer = () => {
  return (
    <footer className="text-black p-6" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">
            11 Al Manara St, Al Quoz, Dubai
          </span>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span className="text-sm font-medium">
            Email: reception@mmmwservice.ae
          </span>
        </div>
   
               
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-sm font-medium">Call: +971 43474666</span>
        </div>
      </div>
      {/* <hr className="border-gray-300 mb-6" /> */}
      {/* Copyright */}
      <div className="mt-10 text-center text-sm border-t border-gray-300 pt-4">
        © Copyright 2025 <strong>Munich Motor Works</strong>. All rights
        reserved |{" "}
        <a href="#" className="hover:underline">
          Sitemap
        </a>{" "}
        |{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>{" "}
        | Developed by <strong>Petalnex Pvt. Ltd</strong>
      </div>
    </footer>
  );
};

export default Footer;
