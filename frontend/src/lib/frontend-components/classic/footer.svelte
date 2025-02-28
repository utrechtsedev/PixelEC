<script>
    import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-svelte';
    
    const currentYear = new Date().getFullYear();
    
    const footerLinks = [
      {
        title: "Shop",
        links: [
          { name: "Laptops", href: "/category/laptops" },
          { name: "Smartphones", href: "/category/smartphones" },
          { name: "Tablets", href: "/category/tablets" },
          { name: "Accessories", href: "/category/accessories" },
          { name: "Monitors", href: "/category/monitors" }
        ]
      },
      {
        title: "Customer Service",
        links: [
          { name: "Contact Us", href: "/contact" },
          { name: "FAQs", href: "/faqs" },
          { name: "Shipping Policy", href: "/shipping" },
          { name: "Returns & Refunds", href: "/returns" },
          { name: "Order Tracking", href: "/track-order" }
        ]
      },
      {
        title: "Company",
        links: [
          { name: "About Us", href: "/about" },
          { name: "Blog", href: "/blog" },
          { name: "Careers", href: "/careers" },
          { name: "Privacy Policy", href: "/privacy" },
          { name: "Terms of Service", href: "/terms" }
        ]
      }
    ];
    
    const socialLinks = [
      { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
      { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
      { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
      { icon: Youtube, href: "https://youtube.com", label: "YouTube" }
    ];
    
    const contactInfo = [
      { icon: Mail, content: "support@pixelstore.com", href: "mailto:support@pixelstore.com" },
      { icon: Phone, content: "+1 (555) 123-4567", href: "tel:+15551234567" },
      { icon: MapPin, content: "123 Tech Street, Digital City, 10101", href: "https://maps.google.com" }
    ];
  </script>
  
  <footer class="bg-base-200 pt-16 pb-8">
    <div class="container mx-auto px-4">
      <!-- Top footer section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Store info -->
        <div>
          <a href="/" class="flex items-center space-x-2 mb-4">
            <span class="text-2xl font-bold text-primary">Pixel Store</span>
          </a>
          <p class="text-base-content/70 mb-6">
            Your destination for the latest tech gadgets and electronics at competitive prices.
          </p>
          
          <!-- Social media -->
          <div class="flex space-x-4">
            {#each socialLinks as social}
              <a
                href={social.href}
                class="btn btn-circle btn-sm btn-ghost"
                aria-label={social.label}
              >
                <svelte:component this={social.icon} size={18} />
              </a>
            {/each}
          </div>
        </div>
        
        <!-- Footer links -->
        {#each footerLinks as section}
          <div>
            <h3 class="font-bold text-lg mb-4">{section.title}</h3>
            <ul class="space-y-2">
              {#each section.links as link}
                <li>
                  <a
                    href={link.href}
                    class="text-base-content/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
        
        <!-- Contact info -->
        <div>
          <h3 class="font-bold text-lg mb-4">Contact Us</h3>
          <ul class="space-y-4">
            {#each contactInfo as contact}
              <li class="flex items-start">
                <svelte:component this={contact.icon} size={18} class="mr-2 mt-1 flex-shrink-0" />
                <a
                  href={contact.href}
                  class="text-base-content/70 hover:text-primary transition-colors duration-200"
                >
                  {contact.content}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      
      <!-- Payment methods -->
      <div class="flex flex-col items-center border-t border-b border-base-300 py-6 mb-6">
        <p class="text-base-content/70 mb-4">Accepted Payment Methods</p>
        <div class="flex space-x-4">
          <div class="w-12 h-8 bg-base-content/20 rounded flex items-center justify-center">Visa</div>
          <div class="w-12 h-8 bg-base-content/20 rounded flex items-center justify-center">MC</div>
          <div class="w-12 h-8 bg-base-content/20 rounded flex items-center justify-center">Amex</div>
          <div class="w-12 h-8 bg-base-content/20 rounded flex items-center justify-center">PayPal</div>
          <div class="w-12 h-8 bg-base-content/20 rounded flex items-center justify-center">Apple</div>
        </div>
      </div>
      
      <!-- Bottom footer -->
      <div class="text-center text-base-content/70 text-sm">
        <p>&copy; {currentYear} Pixel Store. All rights reserved.</p>
      </div>
    </div>
  </footer>