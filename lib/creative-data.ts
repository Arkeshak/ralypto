export type CreativeProject = {
  id: string;
  title: string;
  subtitle?: string;
  category: "logo" | "graphic" | "photo" | "video" | "social" | "marketing" | "digital" | "other";
  imageBefore?: string;
  imageAfter?: string; // or just image
  image?: string;
  videoUrl?: string; // if it's a video
  duration?: string; // e.g. "01:24"
  description: string;
  status: "generated" | "pending"; // asset manifest status
  prompt?: string; // The prompt to generate the asset
};

export const creativeManifest: CreativeProject[] = [
  // 1. Logo & Branding Design
  {
    id: "logo-nexora",
    title: "Nexora",
    subtitle: "TECH SOLUTIONS",
    category: "logo",
    description: "Technology brand identity.",
    status: "pending",
    prompt: "A modern, minimalist technology logo with the letter N and the text 'Nexora TECH SOLUTIONS', dark background, professional branding mockup.",
  },
  {
    id: "logo-brewlab",
    title: "BrewLab",
    subtitle: "COFFEE ROASTERS",
    category: "logo",
    description: "Speciality coffee brand.",
    status: "pending",
    prompt: "A craft coffee brand logo featuring a coffee cup and the text 'BrewLab COFFEE ROASTERS', warm earthy tones, on a dark background.",
  },
  {
    id: "logo-leafora",
    title: "Leafora",
    subtitle: "NATURAL SKINCARE",
    category: "logo",
    description: "Botanical skincare brand.",
    status: "pending",
    prompt: "An elegant botanical skincare logo featuring a leaf and the text 'Leafora NATURAL SKINCARE', soft green tones, dark background.",
  },
  {
    id: "logo-volttix",
    title: "Volttix",
    subtitle: "EV SOLUTIONS",
    category: "logo",
    description: "Electric mobility brand.",
    status: "pending",
    prompt: "A bold electric mobility brand logo featuring a stylized V/lightning bolt and the text 'Volttix EV SOLUTIONS', vibrant green and blue, dark background.",
  },
  {
    id: "logo-skyline",
    title: "Skyline",
    subtitle: "REAL ESTATE",
    category: "logo",
    description: "Property and real estate brand.",
    status: "pending",
    prompt: "A premium real estate logo featuring buildings and the text 'Skyline REAL ESTATE', gold and white, dark background.",
  },
  {
    id: "logo-aqualis",
    title: "Aqualis",
    subtitle: "PURE WATER",
    category: "logo",
    description: "Water and sustainability brand.",
    status: "pending",
    prompt: "A clean sustainability logo featuring a water drop and the text 'Aqualis PURE WATER', blue tones, dark background.",
  },

  // 2. Graphic Design
  {
    id: "graphic-tech-conf",
    title: "Tech Conference 2025",
    category: "graphic",
    description: "Technology conference poster.",
    status: "pending",
    prompt: "A futuristic technology conference poster with the text 'Tech Conference 2025', neon blue and purple gradients, high quality typography.",
  },
  {
    id: "graphic-shoe-ad",
    title: "Performance Meets Style",
    category: "graphic",
    description: "Product launch poster for running shoes.",
    status: "pending",
    prompt: "A dynamic poster for running shoes with the text 'PERFORMANCE MEETS STYLE', featuring a sleek black and red running shoe, dark background.",
  },
  {
    id: "graphic-food",
    title: "Delicious Food",
    category: "graphic",
    description: "Food and beverage promotional poster.",
    status: "pending",
    prompt: "A mouth-watering promotional poster featuring a gourmet burger with the text 'Delicious FOOD', warm lighting, dark background.",
  },
  {
    id: "graphic-travel",
    title: "Explore Sri Lanka",
    category: "graphic",
    description: "Travel campaign poster.",
    status: "pending",
    prompt: "A breathtaking travel poster featuring Sigiriya rock fortress with the text 'Explore SRI LANKA', lush greens, stunning sky.",
  },
  {
    id: "graphic-furniture",
    title: "Modern Living",
    category: "graphic",
    description: "Product brochure for furniture.",
    status: "pending",
    prompt: "An elegant editorial brochure spread featuring mid-century modern furniture, clean typography, neutral tones.",
  },
  {
    id: "graphic-smart-home",
    title: "Smart Home",
    category: "graphic",
    description: "Packaging and promotional collateral.",
    status: "pending",
    prompt: "A sleek promotional graphic for a smart home device, blue glowing accents, futuristic dark background.",
  },

  // 3. Photo Editing (Before / After)
  {
    id: "photo-portrait",
    title: "Portrait Retouching",
    category: "photo",
    description: "Professional portrait retouching.",
    status: "pending",
    prompt: "A split image showing a raw portrait photograph on the left and a professionally color-graded and retouched portrait on the right.",
  },
  {
    id: "photo-landscape",
    title: "Landscape Enhancement",
    category: "photo",
    description: "Landscape enhancement.",
    status: "pending",
    prompt: "A split image showing a dull mountain landscape on the left and a vibrant, color-graded version with dramatic skies on the right.",
  },
  {
    id: "photo-car",
    title: "Automotive Editing",
    category: "photo",
    description: "Automotive photo editing.",
    status: "pending",
    prompt: "A split image showing an unedited photo of a blue sports car on the left and a dramatic, cinematic version with studio lighting on the right.",
  },
  {
    id: "photo-beauty",
    title: "Beauty Retouching",
    category: "photo",
    description: "Fashion or beauty retouching.",
    status: "pending",
    prompt: "A split image showing an unedited beauty portrait on the left and a high-end fashion magazine retouched version on the right.",
  },
  {
    id: "photo-watch",
    title: "Product Enhancement",
    category: "photo",
    description: "Product photo enhancement.",
    status: "pending",
    prompt: "A split image showing a raw photo of a luxury watch on the left and a perfectly lit, sharp, commercial version on the right.",
  },
  {
    id: "photo-sunset",
    title: "Cinematic Color Grading",
    category: "photo",
    description: "Colour grading and cinematic enhancement.",
    status: "pending",
    prompt: "A split image showing a flat beach sunset photo on the left and a cinematic, warm, glowing color-graded version on the right.",
  },

  // 4. Video Editing & Motion Graphics
  {
    id: "video-showreel",
    title: "Ralypto Studio Showreel",
    category: "video",
    duration: "01:24",
    description: "Brand introduction or studio showreel concept.",
    status: "pending",
    prompt: "A cinematic video thumbnail with a glowing 'R' logo and the text 'RALYPTO STUDIO SHOWREEL', dark background, lens flares.",
  },
  {
    id: "video-earbuds",
    title: "Nexbuds Sound Reimagined",
    category: "video",
    duration: "00:45",
    description: "Product advertisement.",
    status: "pending",
    prompt: "A premium video thumbnail for wireless earbuds floating in space with the text 'NEXBUDS', dramatic lighting, dark background.",
  },
  {
    id: "video-travel",
    title: "Sri Lanka Journey",
    category: "video",
    duration: "01:12",
    description: "Travel film.",
    status: "pending",
    prompt: "A cinematic video thumbnail of a train journey through lush green tea plantations at sunset.",
  },
  {
    id: "video-ag",
    title: "Smart Agriculture",
    category: "video",
    duration: "00:58",
    description: "Smart agriculture promotional concept.",
    status: "pending",
    prompt: "A high-tech video thumbnail showing a drone flying over a farm with HUD elements and data overlays.",
  },
  {
    id: "video-car",
    title: "Drive the Future",
    category: "video",
    duration: "00:40",
    description: "Social media reel or short-form advertisement.",
    status: "pending",
    prompt: "An energetic video thumbnail featuring a sports car speeding through a neon-lit city with motion blur.",
  },
  {
    id: "video-tech",
    title: "How It Works",
    category: "video",
    duration: "01:00",
    description: "Technology product demonstration.",
    status: "pending",
    prompt: "A clean video thumbnail showing an exploded 3D view of an electronic device with glowing blue components.",
  },

  // 5. Social Media Content
  {
    id: "social-coffee",
    title: "BrewLab Social",
    category: "social",
    description: "Coffee-shop promotional campaign.",
    status: "pending",
    prompt: "A beautiful Instagram post design for an iced coffee with the text 'Good Coffee Brighter Days', warm aesthetic.",
  },
  {
    id: "social-shoes",
    title: "Footwear Launch",
    category: "social",
    description: "Fashion or footwear product launch.",
    status: "pending",
    prompt: "A bold social media post for a new sneaker drop with the text 'NEW ARRIVAL', high contrast blue and black.",
  },
  {
    id: "social-food",
    title: "Healthy Living",
    category: "social",
    description: "Fitness and lifestyle campaign.",
    status: "pending",
    prompt: "A clean social media post featuring a healthy salad bowl with the text 'Healthy Living Everyday', light green aesthetic.",
  },
  {
    id: "social-tech",
    title: "Tech Tips",
    category: "social",
    description: "Technology tips and educational content.",
    status: "pending",
    prompt: "An educational social media graphic showing a laptop and the text 'TECH TIPS FOR A SMARTER YOU', dark blue tones.",
  },
  {
    id: "social-sale",
    title: "Summer Sale",
    category: "social",
    description: "Retail seasonal sale.",
    status: "pending",
    prompt: "A vibrant social media post for a summer sale featuring a smiling person with sunglasses, bright pink and orange gradient.",
  },
  {
    id: "social-skincare",
    title: "Skincare Campaign",
    category: "social",
    description: "Skincare brand content.",
    status: "pending",
    prompt: "A minimalist social media post for a skincare bottle with the text 'Skincare That Cares', neutral beige background.",
  },

  // 6. Marketing & Advertisement Design
  {
    id: "ad-realestate",
    title: "Skyline Billboard",
    category: "marketing",
    description: "Real estate advertising campaign.",
    status: "pending",
    prompt: "A photorealistic mockup of a large outdoor billboard displaying a luxury home advertisement for 'Skyline Real Estate'.",
  },
  {
    id: "ad-tech",
    title: "Ralypto Innovation",
    category: "marketing",
    description: "Technology product campaign.",
    status: "pending",
    prompt: "A photorealistic mockup of an airport digital billboard displaying a futuristic tech ad with the text 'Innovation Has No Limits'.",
  },
  {
    id: "ad-grocery",
    title: "Fresh & Natural",
    category: "marketing",
    description: "Restaurant or café promotion.",
    status: "pending",
    prompt: "A photorealistic mockup of a bus stop advertisement displaying a fresh produce ad 'Fresh & Natural'.",
  },
  {
    id: "ad-coffee",
    title: "Next Coffee Moment",
    category: "marketing",
    description: "Retail seasonal sale.",
    status: "pending",
    prompt: "A photorealistic mockup of an urban digital poster displaying a coffee ad with a glowing cup.",
  },
  {
    id: "ad-sale",
    title: "Mega Sale Banner",
    category: "marketing",
    description: "Consumer product launch.",
    status: "pending",
    prompt: "A bright red promotional banner mockup displaying 'MEGA SALE 50% OFF' with a model holding shopping bags.",
  },
  {
    id: "ad-energy",
    title: "Clean Energy Campaign",
    category: "marketing",
    description: "Renewable energy campaign.",
    status: "pending",
    prompt: "A wide outdoor billboard mockup showing wind turbines and a white electric car with the text 'Clean Energy Brighter Tomorrow'.",
  }
];
