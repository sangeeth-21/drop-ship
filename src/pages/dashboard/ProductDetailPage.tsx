import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, ShoppingCart, ChevronLeft, Check, Star, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const mockProducts = [
  {
    id: "1",
    name: "Sony PS5 DualSense",
    slug: "sony-ps5-dualsense",
    price: 6999,
    rating: 4.5,
    reviews: 32,
    description: "Experience the next generation of gaming with the Sony PS5 DualSense controller. Featuring haptic feedback, adaptive triggers, and a built-in microphone.",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "/lovable-uploads/6fde1131-a068-43a6-9ed4-55698fbdef85.png",
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1617096200227-6c37f8fb07e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    ],
    inStock: true,
    colors: ["white", "black", "purple", "red"],
    features: ["Haptic Feedback", "Adaptive Triggers", "Built-in Microphone", "Motion Sensors"],
    specs: [
      { name: "Weight", value: "280g" },
      { name: "Battery", value: "1560mAh" },
      { name: "Connectivity", value: "Bluetooth 5.1, USB-C" },
    ]
  },
  {
    id: "2",
    name: "Sony PS5 DualSense Edge",
    slug: "sony-ps5-dualsense-edge",
    price: 18999,
    rating: 4.7,
    reviews: 18,
    description: "The premium controller for PS5 with customizable controls, replaceable stick modules, and back buttons.",
    images: [
      "https://images.unsplash.com/photo-1625560483637-d83219adc2e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    ],
    inStock: true,
    colors: ["white", "black"],
    features: ["Customizable Controls", "Replaceable Stick Modules", "Back Buttons", "Function Buttons"],
    specs: [
      { name: "Weight", value: "325g" },
      { name: "Battery", value: "1560mAh" },
      { name: "Connectivity", value: "Bluetooth 5.1, USB-C" },
    ]
  },
  {
    id: "3",
    name: "RGB Gaming Keyboard",
    slug: "rgb-gaming-keyboard",
    price: 4999,
    rating: 4.2,
    reviews: 56,
    description: "Mechanical gaming keyboard with RGB backlighting and programmable keys.",
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    ],
    inStock: true,
    colors: ["black"],
    features: ["Mechanical Switches", "RGB Backlighting", "Programmable Keys", "Anti-Ghosting"],
    specs: [
      { name: "Switch Type", value: "Mechanical" },
      { name: "Key Rollover", value: "N-Key" },
      { name: "Cable Length", value: "1.8m" },
    ]
  },
  {
    id: "4",
    name: "RED Gaming Mouse",
    slug: "red-gaming-mouse",
    price: 3499,
    rating: 4.4,
    reviews: 42,
    description: "High-precision gaming mouse with adjustable DPI and programmable buttons.",
    images: [
      "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    ],
    inStock: true,
    colors: ["red", "black"],
    features: ["16000 DPI", "RGB Lighting", "8 Programmable Buttons", "Lightweight Design"],
    specs: [
      { name: "Sensor", value: "Optical" },
      { name: "Weight", value: "90g" },
      { name: "Cable Length", value: "2.1m" },
    ]
  },
  {
    id: "5",
    name: "RGB CPU Cooler",
    slug: "rgb-cpu-cooler",
    price: 7999,
    rating: 4.8,
    reviews: 27,
    description: "High-performance liquid CPU cooler with vibrant RGB lighting and quiet operation.",
    images: [
      "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    ],
    inStock: true,
    colors: ["rgb"],
    features: ["240mm Radiator", "RGB Lighting", "Quiet Operation", "Easy Installation"],
    specs: [
      { name: "Fan Speed", value: "500-1800 RPM" },
      { name: "Noise Level", value: "25 dBA" },
      { name: "Compatibility", value: "Intel & AMD" },
    ]
  }
];

const similarProducts = [
  { id: "2", name: "Sony PS5 DualSense Edge", image: "https://images.unsplash.com/photo-1625560483637-d83219adc2e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", price: 18999, rating: 4.7, reviews: 18 },
  { id: "3", name: "RGB Gaming Keyboard", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", price: 4999, rating: 4.2, reviews: 56 },
  { id: "4", name: "RED Gaming Mouse", image: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", price: 3499, rating: 4.4, reviews: 42 },
  { id: "5", name: "RGB CPU Cooler", image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", price: 7999, rating: 4.8, reviews: 27 },
];

const ProductDetailPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const product = mockProducts.find(p => p.slug === productSlug) || mockProducts[0];
  
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) 
          ? "text-yellow-400 fill-yellow-400" 
          : i < rating 
            ? "text-yellow-400 fill-yellow-400 opacity-50" 
            : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/dashboard/store')}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store
          </Button>
          <span className="text-sm text-muted-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900/30 rounded-xl overflow-hidden">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="object-contain w-full h-80 md:h-96 p-8"
              />
            </div>
            
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`min-w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer
                    ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center space-x-1">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div>
              <div className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</div>
              {product.inStock ? (
                <span className="inline-flex items-center text-green-600 text-sm mt-1">
                  <Check className="h-4 w-4 mr-1" /> In Stock
                </span>
              ) : (
                <span className="text-red-500 text-sm mt-1">Out of Stock</span>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div>
              <h3 className="text-sm font-medium mb-2">Colors</h3>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full focus:outline-none ${
                      selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                    style={{ 
                      backgroundColor: color === 'rgb' 
                        ? 'transparent' 
                        : color,
                      background: color === 'rgb' 
                        ? 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)' 
                        : undefined 
                    }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full border"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="my-10">
          <h2 className="text-xl font-bold mb-4">Specifications</h2>
          <div className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex">
                  <div className="w-1/3 font-medium">{spec.name}</div>
                  <div className="w-2/3 text-muted-foreground">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-xl font-bold mb-4">Similar Products</h2>
          
          <div className="relative">
            <div className="overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex space-x-4 min-w-min">
                {similarProducts.map(item => (
                  <Link 
                    key={item.id} 
                    to={`/dashboard/product/${mockProducts.find(p => p.id === item.id)?.slug || ''}`}
                    className="min-w-[200px] max-w-[200px]"
                  >
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg overflow-hidden group hover:shadow-md transition-all">
                      <div className="p-4 h-40 flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-32 object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800">
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                        <div className="flex items-center mt-1 justify-between">
                          <div className="text-primary font-bold">₹{item.price.toLocaleString()}</div>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs ml-1">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-purple-900 text-white rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Exclusivity</h3>
              <ul className="space-y-2">
                <li className="text-sm">30-day free return</li>
                <li className="text-sm">Extended warranty</li>
                <li className="text-sm">Special discounts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Support</h3>
              <ul className="space-y-2">
                <li className="text-sm">Shipping & Delivery</li>
                <li className="text-sm">Return Policy</li>
                <li className="text-sm">Technical Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Account</h3>
              <ul className="space-y-2">
                <li className="text-sm">My Account</li>
                <li className="text-sm">Orders</li>
                <li className="text-sm">Wishlist</li>
                <li className="text-sm">Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li className="text-sm">FAQ</li>
                <li className="text-sm">Support</li>
                <li className="text-sm">T&C</li>
                <li className="text-sm">Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductDetailPage;
