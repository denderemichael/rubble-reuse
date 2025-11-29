export default function Footer() {
  return (
    <footer className="py-8" style={{ backgroundColor: '#3E3F29' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-white">Rubble Reuse</h3>
            <p className="text-sm text-gray-300">Building a sustainable future, one material at a time.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/marketplace" className="text-gray-300 hover:text-white">Marketplace</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/marketplace?category=Bricks" className="text-gray-300 hover:text-white">Bricks</a></li>
              <li><a href="/marketplace?category=Cement" className="text-gray-300 hover:text-white">Cement</a></li>
              <li><a href="/marketplace?category=Metal" className="text-gray-300 hover:text-white">Metal</a></li>
              <li><a href="/marketplace?category=Timber" className="text-gray-300 hover:text-white">Timber</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Harare, Zimbabwe</li>
              <li>info@rubble-reuse.com</li>
              <li>+263 77 123 4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Rubble Reuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}