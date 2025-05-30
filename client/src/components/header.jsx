// import React from "react";

// import logo from "../../public/Munich-Landscape-logo-Black1__2_-removebg-preview-1.png";

// const Header = () => {
//   return (
//     <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
//       <div className="flex items-center">
//         {/* <Image
//           src={logo}
//           alt="Logo"
//           width={150}
//           height={60}
//           className="object-contain"
//           priority
//         /> */}
//         <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
//       </div>
//       <nav className="flex space-x-6">
//         <a href="/" className="text-gray-700 hover:text-black font-medium">
//           Home
//         </a>
//         <a href="/about" className="text-gray-700 hover:text-black font-medium">
//           About
//         </a>
//         <a
//           href="/services"
//           className="text-gray-700 hover:text-black font-medium"
//         >
//           Services
//         </a>
//         <a
//           href="/contact"
//           className="text-gray-700 hover:text-black font-medium"
//         >
//           Contact
//         </a>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import logo from "../../public/Munich-Landscape-logo-Black1__2_-removebg-preview-1.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
      </div>
      <nav className="flex space-x-6">
        <a
          href="/"
          className="text-blue-900 hover:text-sky-500 font-medium transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="/about"
          className="text-blue-900 hover:text-sky-500 font-medium transition-colors duration-200"
        >
          About
        </a>
        <a
          href="/services"
          className="text-blue-900 hover:text-sky-500 font-medium transition-colors duration-200"
        >
          Services
        </a>
        <a
          href="/contact"
          className="text-blue-900 hover:text-sky-500 font-medium transition-colors duration-200"
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
