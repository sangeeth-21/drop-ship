import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Book, Camera, Eye, Flower, Gamepad, Headphones, Laptop, Music, Play, Shirt, ShoppingBag, ShoppingCart, Speaker, Smartphone, Star, Utensils, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useDashboardColors } from "@/hooks/use-dashboard-colors";
import { Leaf } from "lucide-react";

// Interface definitions
interface Product {
  id: string;
  name: string;
  slug: string;
  currentPrice: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  category?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  price?: string;
  image: string;
  colorClass: string;
  link: string;
}

// Main component
const StorePage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const colors = useDashboardColors();

  // Top banner data
  const topBanners: Banner[] = [
    {
      id: "1",
      title: "Gaming Consoles",
      subtitle: "From ₹13,990",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-purple-600 to-purple-500",
      link: "/dashboard/category/gaming"
    },
    {
      id: "2",
      title: "PS5 Games",
      subtitle: "From ₹999",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-blue-500 to-blue-400",
      link: "/dashboard/category/ps5-games"
    },
    {
      id: "3",
      title: "Party speakers",
      subtitle: "From ₹3,999",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-blue-600 to-blue-500",
      link: "/dashboard/category/speakers"
    }
  ];

  // Middle banner data
  const middleBanners: Banner[] = [
    {
      id: "4",
      title: "Men's shoes, sandals...",
      subtitle: "55-80% off",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-purple-600 to-purple-500",
      link: "/dashboard/category/mens-shoes"
    },
    {
      id: "5",
      title: "The Bear House, Snitch...",
      subtitle: "65-80% off",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-purple-500 to-purple-400",
      link: "/dashboard/category/fashion"
    },
    {
      id: "6",
      title: "Carry in style with style!",
      subtitle: "From ₹449",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-indigo-500 to-indigo-400",
      link: "/dashboard/category/bags"
    }
  ];

  // Bottom banner data
  const bottomBanners: Banner[] = [
    {
      id: "7",
      title: "Premium Office Chairs",
      subtitle: "From ₹7,990",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-indigo-600 to-indigo-500",
      link: "/dashboard/category/office-chairs"
    },
    {
      id: "8",
      title: "L-shaped, 3-seater sofa & more",
      subtitle: "From ₹9,999",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-blue-600 to-blue-500",
      link: "/dashboard/category/sofas"
    },
    {
      id: "9",
      title: "King, Queen & more",
      subtitle: "From ₹2,499",
      image: "/lovable-uploads/1cff010a-11e5-49da-bdd7-b412f6961fa9.png",
      colorClass: "from-blue-500 to-blue-400",
      link: "/dashboard/category/mattresses"
    }
  ];

  // Electronics category
  const electronicsProducts: Product[] = [
    {
      id: "e1",
      name: "Mini Projector",
      slug: "mini-projector",
      currentPrice: 3599,
      originalPrice: 5999,
      rating: 4.2,
      reviews: 135,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "electronics"
    },
    {
      id: "e2",
      name: "USB-C Adapter",
      slug: "usb-c-adapter",
      currentPrice: 1499,
      originalPrice: 1999,
      rating: 4.0,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1588599592747-aa192708c799?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "electronics"
    },
    {
      id: "e3",
      name: "Wired Earbuds",
      slug: "wired-earbuds",
      currentPrice: 799,
      originalPrice: 999,
      rating: 3.9,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "electronics"
    },
    {
      id: "e4",
      name: "Gaming Keyboard",
      slug: "gaming-keyboard",
      currentPrice: 2599,
      originalPrice: 3999,
      rating: 4.6,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "electronics"
    },
    {
      id: "e5",
      name: "Mechanical Keyboard",
      slug: "mechanical-keyboard",
      currentPrice: 3499,
      originalPrice: 4999,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "electronics"
    },
    {
      id: "e6",
      name: "Portable SSD",
      slug: "portable-ssd",
      currentPrice: 5499,
      originalPrice: 7999,
      rating: 4.8,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1597858520171-563a8e8b9925?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "electronics"
    },
    {
      id: "e7",
      name: "Fitness Tracker",
      slug: "fitness-tracker",
      currentPrice: 1799,
      originalPrice: 2499,
      rating: 4.3,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "electronics"
    },
  ];

  // Smart Picks category
  const smartPicksProducts: Product[] = [
    {
      id: "sp1",
      name: "Smart Camera",
      slug: "smart-camera",
      currentPrice: 2799,
      originalPrice: 3999,
      rating: 4.5,
      reviews: 132,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "smart-picks"
    },
    {
      id: "sp2",
      name: "Laptop Stand",
      slug: "laptop-stand",
      currentPrice: 899,
      originalPrice: 1499,
      rating: 4.2,
      reviews: 79,
      image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "smart-picks"
    },
    {
      id: "sp3",
      name: "Mobile Cover",
      slug: "mobile-cover",
      currentPrice: 499,
      originalPrice: 999,
      rating: 4.0,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1541345023926-55d6e0853f4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "smart-picks"
    },
    {
      id: "sp4",
      name: "Fitness Smartwatch",
      slug: "fitness-smartwatch",
      currentPrice: 2599,
      originalPrice: 3999,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "smart-picks"
    },
    {
      id: "sp5",
      name: "iPhone 13 Pro",
      slug: "iphone-13-pro",
      currentPrice: 79999,
      originalPrice: 99999,
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "smart-picks"
    },
    {
      id: "sp6",
      name: "OLED Smartwatch",
      slug: "oled-smartwatch",
      currentPrice: 3999,
      originalPrice: 5999,
      rating: 4.5,
      reviews: 171,
      image: "https://images.unsplash.com/photo-1603816245457-fe9bb98c1f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "smart-picks"
    },
    {
      id: "sp7",
      name: "TWS Earphones",
      slug: "tws-earphones",
      currentPrice: 1399,
      originalPrice: 2499,
      rating: 4.4,
      reviews: 184,
      image: "https://images.unsplash.com/photo-1606741965429-fcefe442cdcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "smart-picks"
    },
  ];

  // Beauty, Auto & more category
  const beautyAutoProducts: Product[] = [
    {
      id: "ba1",
      name: "Dry Fruits & Nuts",
      slug: "dry-fruits-nuts",
      currentPrice: 399,
      originalPrice: 599,
      rating: 4.6,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1516747773440-2935878dd330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "beauty-auto"
    },
    {
      id: "ba2",
      name: "Acoustic Guitar",
      slug: "acoustic-guitar",
      currentPrice: 2999,
      originalPrice: 4599,
      rating: 4.4,
      reviews: 93,
      image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "beauty-auto"
    },
    {
      id: "ba3",
      name: "Car & Bike Wash",
      slug: "car-bike-wash",
      currentPrice: 749,
      originalPrice: 999,
      rating: 4.2,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "beauty-auto"
    },
    {
      id: "ba4",
      name: "Best Seller Novels",
      slug: "bestseller-novels",
      currentPrice: 499,
      originalPrice: 799,
      rating: 4.7,
      reviews: 215,
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "beauty-auto"
    },
    {
      id: "ba5",
      name: "Face Serum",
      slug: "face-serum",
      currentPrice: 649,
      originalPrice: 999,
      rating: 4.5,
      reviews: 143,
      image: "https://images.unsplash.com/photo-1620916566256-4592a8449044?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "beauty-auto"
    },
    {
      id: "ba6",
      name: "Protein Supplements",
      slug: "protein-supplements",
      currentPrice: 899,
      originalPrice: 1399,
      rating: 4.3,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "beauty-auto"
    },
    {
      id: "ba7",
      name: "City & MTB Cycles",
      slug: "city-mtb-cycles",
      currentPrice: 5499,
      originalPrice: 8999,
      rating: 4.6,
      reviews: 116,
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "beauty-auto"
    },
  ];

  // Original product data (keeping for compatibility)
  const products = [
    {
      id: "1",
      name: "The north coat",
      slug: "north-coat",
      currentPrice: 260,
      originalPrice: 360,
      rating: 5,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "2",
      name: "Gucci duffle bag",
      slug: "gucci-bag",
      currentPrice: 960,
      originalPrice: 1160,
      rating: 4.5,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "3",
      name: "RGB liquid CPU Cooler",
      slug: "rgb-cpu-cooler",
      currentPrice: 160,
      originalPrice: 170,
      rating: 4.5,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "4",
      name: "Small BookSelf",
      slug: "small-bookshelf",
      currentPrice: 360,
      originalPrice: null,
      rating: 5,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
  ];

  const categories = [
    {
      name: "Clothing",
      icon: <Shirt className="h-6 w-6" />
    },
    {
      name: "Electronics",
      icon: <Laptop className="h-6 w-6" />
    },
    {
      name: "Books",
      icon: <Book className="h-6 w-6" />
    },
    {
      name: "Beauty",
      icon: <Flower className="h-6 w-6" />
    },
    {
      name: "Food",
      icon: <Utensils className="h-6 w-6" />
    },
    {
      name: "Music",
      icon: <Music className="h-6 w-6" />
    },
    {
      name: "Nature",
      icon: <Leaf className="h-6 w-6" />
    },
    {
      name: "Photography",
      icon: <Camera className="h-6 w-6" />
    },
  ];

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{
          width: '50%'
        }}>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  const handleCardClick = (slug: string) => {
    navigate(`/dashboard/product/${slug}`);
  };

  const handlePreview = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setPreviewProduct(product);
  };

  const closePreview = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPreviewProduct(null);
  };

  const renderProductCard = (product: Product) => (
    <div 
      key={product.id} 
      className="group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200" 
      onClick={() => handleCardClick(product.slug)}
    >
      <div className="relative">
        <div className="h-[120px] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
        
        <div className="absolute top-2 right-2 z-10">
          <button 
            className="bg-white/80 dark:bg-gray-700/80 p-1.5 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-600 transition" 
            onClick={(e) => handlePreview(e, product)}
          >
            <Eye className="h-3.5 w-3.5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1 mb-1">{product.name}</h3>
        
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-primary font-bold text-sm">₹{product.currentPrice}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-xs">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderBanner = (banner: Banner) => (
    <Link 
      to={banner.link} 
      key={banner.id} 
      className="rounded-lg overflow-hidden relative shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className={`bg-gradient-to-r ${banner.colorClass} w-full h-full absolute inset-0 opacity-90`}></div>
      <div className="relative p-4 text-white h-[120px] flex flex-col justify-center">
        <h3 className="font-bold text-lg">{banner.title}</h3>
        <p className="text-white/90 text-sm">{banner.subtitle}</p>
        <button className="mt-2 bg-white text-gray-800 text-xs font-medium py-1 px-3 rounded-full inline-flex items-center w-fit">
          View Products <ArrowRight className="ml-1 h-3 w-3" />
        </button>
      </div>
    </Link>
  );

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center gap-10 relative z-10">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block text-primary/80 font-medium mb-2">
                Trendy Collection
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Let's Create <br />your Own Style
              </h1>
              <p className="text-muted-foreground max-w-md">
                Speedily say has suitable disposal and boy. 
                Exercise joy man children rejoiced.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-md hover:shadow-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </div>
            </div>

            {!isMobile && (
              <div className="md:w-1/2 relative">
                <div className="relative w-full h-[380px] flex items-center justify-center">
                  <div className="absolute w-[300px] h-[300px] md:w-[340px] md:h-[340px] bg-blue-500 rounded-full opacity-90 z-0"></div>
                  <img alt="Fashion Model" className="h-[360px] object-contain relative z-10" src="/lovable-uploads/155e12a8-84b0-4085-94a6-b115e48c20f4.png" />
                  <div className="absolute top-0 right-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 z-20">
                    <div className="text-xl font-bold">12M+</div>
                    <div className="text-xs text-muted-foreground">Worldwide Product<br />sale per year</div>
                  </div>
                  <div className="absolute right-0 top-1/4 text-white font-bold">
                    <div className="text-2xl">1.5m</div>
                    <div className="text-sm">Monthly traffic</div>
                  </div>
                  <div className="absolute right-10 bottom-12 text-white font-bold">
                    <div className="text-2xl">100K</div>
                    <div className="text-sm">Happy customers</div>
                  </div>
                  <div className="absolute left-10 bottom-10 bg-white dark:bg-gray-800 rounded-xl flex items-center px-4 py-2 shadow-lg z-20">
                    <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full mr-2">
                      <ShoppingCart className="h-4 w-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">Best Shop</div>
                      <div className="text-muted-foreground">Offers</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-3" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-5">Shop by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/20 shadow-sm group-hover:shadow-md transition-all mb-2 group-hover:scale-105">
                  <div className="text-primary group-hover:text-primary/80 transition-colors">
                    {category.icon}
                  </div>
                </div>
                <span className="text-xs md:text-sm text-center font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {topBanners.map(banner => renderBanner(banner))}
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Electronics</h2>
            <Link to="/dashboard/category/electronics" className="text-primary text-sm font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {electronicsProducts.map(product => renderProductCard(product))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Smart Picks</h2>
            <Link to="/dashboard/category/smart-picks" className="text-primary text-sm font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {smartPicksProducts.map(product => renderProductCard(product))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {middleBanners.map(banner => renderBanner(banner))}
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Beauty, Auto & more</h2>
            <Link to="/dashboard/category/beauty-auto" className="text-primary text-sm font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {beautyAutoProducts.map(product => renderProductCard(product))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {bottomBanners.map(banner => renderBanner(banner))}
        </div>

        {previewProduct && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closePreview}
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-[220px] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img 
                    src={previewProduct.image} 
                    alt={previewProduct.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <button 
                  className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700"
                  onClick={closePreview}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{previewProduct.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {renderRating(previewProduct.rating)}
                  </div>
                  <span className="text-gray-500 text-sm">({previewProduct.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-primary text-xl font-bold">₹{previewProduct.currentPrice}</span>
                  {previewProduct.originalPrice && (
                    <span className="text-gray-500 line-through">₹{previewProduct.originalPrice}</span>
                  )}
                  {previewProduct.originalPrice && (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-0.5 rounded">
                      {Math.round(((previewProduct.originalPrice - previewProduct.currentPrice) / previewProduct.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      closePreview();
                      handleCardClick(previewProduct.slug);
                    }}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StorePage;
