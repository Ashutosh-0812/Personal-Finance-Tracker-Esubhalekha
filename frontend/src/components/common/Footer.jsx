import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600 text-sm">
              © 2025 FinanceTracker. All rights reserved.
            </span>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-600 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Ashutosh Singh
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;