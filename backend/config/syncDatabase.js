// app.js of server.js
const express = require('express');
const { sequelize, models } = require('../models'); // importeer de sequelize-instantie

const app = express();
app.use(express.json());

// Synchroniseer de modellen met de database (alleen in development)
sequelize.sync({ force: true }) // force = true zal tabellen droppen en opnieuw aanmaken!
  .then(async () => {
    console.log('Database gesynchroniseerd!');
    await models.StorefrontSettings.bulkCreate([
      {
        id: 0, 
        setting_key: "storefront_setup", 
        setting_value: {
          name: "Pixelstore",
          Description: "I sell things on the internet",
          email: "postmaster@dmc.chat",
          phone: "+31 6 0000 0000",
          address: "Prins Hendrikkade, 1015AB, Amsterdam, NL",
          currency: "EUR",
          timezone: "Amsterdam/Europe",
          social: [
            {
              facebook: "Pixelstore",
              instalgram: "Pixelstore",
              twitter: "Compiledpixel",
              youtube: "Pixelstore",
              Pinterest: "Pixelstore"
            }
          ]
        }, 
        value_type: "json", 
        display_name: "Store Settings", 
        category: "general",
        description: "This entry keeps all the essentials information about your store",
        is_active: true,
      },
      {
        setting_key: "storefront_domain", 
            setting_value: "pixelstore.com",
            value_type: "string",
            category: "general",
            display_name: "Store Domain", 
            description: "This entry keeps your store domain",
            is_active: true,
      },
      {
        setting_key: "storefront_theme", 
        setting_value: "modern",
        value_type: "string",
        display_name: "Store Theme", 
        category: "layout",
        description: "This entry keeps your theme",
        is_active: true,
      },
      {
        setting_key: "storefront_colors", 
        setting_value: ["#FFF", "#000", "#FFF", "#000"],
        value_type: "json",
        display_name: "Store Colors", 
        category: "layout",
        description: "This entry keeps your store colors",
        is_active: true,
      },
      {
        setting_key: "storefront_seo", 
        setting_value: {
          title: "Pixelstore",
          description: "This is my store meta description",
          google_verification: "",
          terms_url: "/terms",
          privacy_url: "/privacy",
          return_url: "/return"
        },
        value_type: "json",
        category: "general",
        display_name: "Store Meta Information", 
        description: "This entry keeps your store meta information",
        is_active: true,
      },
      {
        setting_key: "storefront_components", 
        setting_value: {
          hero: {
              enabled: true,
              title: "",
              undertext: "",
              buttontext: "",
              imageurl: "",
          },
          categories: { enabled: true },
          newarrivals: { enabled: true },
          doublehero: {
              enabled: true,
              components: [
                  {
                      title: "",
                      undertext: "",
                      buttontext: "",
                      imageurl: "",
                  },
                  {
                      title: "",
                      undertext: "",
                      buttontext: "",
                      imageurl: "",
                  }
              ]
          },
          featuredproducts: [0,12,22,24,67],
          triplehero: {
              enabled: true,
              components: [
                  {
                      title: "",
                      undertext: "",
                      buttontext: "",
                      imageurl: "",
                  },
                  {
                      title: "",
                      undertext: "",
                      buttontext: "",
                      imageurl: "",
                  },
                  {
                      title: "",
                      undertext: "",
                      buttontext: "",
                      imageurl: "",
                  }
                  
              ]
          }
      },
        value_type: "json",
        display_name: "Store Component Props", 
        description: "This entry keeps your stores components",
        category: "layout",
        is_active: true,
      },
      {
        setting_key: "storefront_checkout", 
        setting_value: {
          allowGuest: true,
          orderConfirmation: true,
          orderNotes: true,
          minimumOrderValue: 0
        },
        value_type: "json",
        display_name: "Stores Checkout Settings", 
        description: "This entry keeps your stores checkout settings",
        category: "general",
        is_active: true,
      },
      {
        setting_key: "storefront_shipping", 
        setting_value: {
          freeShippingThreshold: 0,
          displayShippingPrice: true,
          enableInternationalShipping: true,
        },
        value_type: "json",
        display_name: "Stores Shipping Settings", 
        description: "This entry keeps your stores shipping settings",
        category: "general",
        is_active: true,
      },
      {
        setting_key: "storefront_inventory", 
        setting_value: {
          lowStockThreshold: 5,
          displayOutOfStock: true,
          lowStockNotifications: true,
          automaticInventoryUpdates: true,
          allowBackorders: false,
          stockStatusFormat: "text",
          weeklyInventoryReports: true,
          productPerformanceAnalysis: true
        },
        value_type: "json",
        display_name: "Stores Inventory Settings", 
        description: "This entry keeps your stores inventory settings",
        category: "general",
        is_active: true,
      },
    ])
  })
  .catch((err) => {
    console.error('Fout bij sync:', err);
  });

// Routes (zoals eerder getoond)
// ...

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
