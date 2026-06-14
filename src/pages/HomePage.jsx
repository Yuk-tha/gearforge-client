import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaShieldAlt, FaTruck, FaHeadset } from 'react-icons/fa';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await productAPI.getAll({ limit: 4, sort: 'high' });
        setFeaturedProducts(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Keyboards', emoji: '⌨️' },
    { name: 'Mouse', emoji: '🖱️' },
    { name: 'Headsets', emoji: '🎧' },
    { name: 'Controllers', emoji: '🎮' },
    { name: 'Chairs', emoji: '🪑' },
    { name: 'Mousepads', emoji: '🟦' },
    { name: 'Webcams', emoji: '📷' },
    { name: 'Microphones', emoji: '🎙️' },
  ];

  const reviews = [
    { name: 'Arjun S.', rating: 5, comment: 'Amazing quality products! Fast delivery and great customer support.' },
    { name: 'Priya M.', rating: 5, comment: 'GearForge is my go-to store for all gaming accessories. Highly recommended!' },
    { name: 'Rahul K.', rating: 4, comment: 'Great selection of products at competitive prices. Will definitely buy again.' },
  ];

  return (
    <div className="bg-dark min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-neon/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center">
          <div className="inline-block bg-primary/20 border border-primary/30 text-primary text-sm px-4 py-1 rounded-full mb-6">
            🎮 Next-Gen Gaming Gear
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Level Up Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon"> Setup</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mb-10">
            Discover premium gaming accessories engineered for performance.
            From mechanical keyboards to pro controllers — forge your ultimate battlestation.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/products"
              className="bg-primary hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition"
            >
              Shop Now <FaArrowRight />
            </Link>
            <Link
              to="/products"
              className="border border-border text-gray-300 hover:border-primary hover:text-primary font-semibold px-8 py-3 rounded-lg transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <FaTruck />, text: 'Free Shipping over ₹999' },
            { icon: <FaShieldAlt />, text: '1 Year Warranty' },
            { icon: <FaHeadset />, text: '24/7 Support' },
            { icon: <FaStar />, text: 'Top Rated Products' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-400">
              <span className="text-primary text-xl">{item.icon}</span>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          Shop by <span className="text-primary">Category</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="glass rounded-xl p-6 text-center hover:border-primary/50 transition group"
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <div className="text-gray-300 group-hover:text-primary transition text-sm font-medium">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            Featured <span className="text-primary">Products</span>
          </h2>
          <Link to="/products" className="text-primary hover:underline flex items-center gap-1 text-sm">
            View All <FaArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Reviews */}
      <section className="bg-surface border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            What Gamers <span className="text-primary">Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <FaStar key={j} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm mb-4">"{review.comment}"</p>
                <p className="text-white font-semibold text-sm">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 GearForge. All rights reserved. Built with ❤️ for gamers.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;