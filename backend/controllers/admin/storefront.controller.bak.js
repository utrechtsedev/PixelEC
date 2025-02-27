const {models} = require('../../models')


exports.setStoreInformation = async (req, res) => {
    const { name, description, email, phone, address, currency, timezone, social } = req.body;
    if (!name || !description || !email || !phone || !address || !currency || !timezone || !social) {
        return res.status(500).json({message: "Internal server error"})
    }
    try {
    const updateSettings = await models.StorefrontSettings.upsert({
        id: 0, 
        setting_key: "storefront_setup", 
        setting_value: req.body, 
        value_type: "json", 
        display_name: "Store Settings", 
        category: "general",
        description: "This entry keeps all the essentials information about your store",
        is_active: true,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

exports.setStoreDomain = async (req, res) => {
    const { domain } = req.body;
    try {
        const updateSettings = await models.StorefrontSettings.upsert({
            setting_key: "storefront_domain", 
            setting_value: domain,
            value_type: "string",
            category: "general",
            display_name: "Store Domain", 
            description: "This entry keeps your store domain",
            is_active: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };
};

exports.setStoreTheme = async (req, res) => {
    const {theme} = req.body;
    try {
        const updateSettings = await models.StorefrontSettings.upsert({
            setting_key: "storefront_theme", 
            setting_value: theme,
            value_type: "string",
            display_name: "Store Theme", 
            category: "layout",
            description: "This entry keeps your theme",
            is_active: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };
};

exports.setStoreColors = async (req, res) => {
    const {primary, secondary, accent, background} = req.body;
    try {
        const updateSettings = await models.StorefrontSettings.upsert({
            setting_key: "storefront_colors", 
            setting_value: req.body,
            value_type: "json",
            display_name: "Store Colors", 
            category: "layout",
            description: "This entry keeps your store colors",
            is_active: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };
};

exports.setSeoSettings = async (req, res) => {
    const {title, description, google_verification, terms_url, privacy_url, return_url} = req.body;
    try {
        const updateSettings = await models.StorefrontSettings.upsert({
            setting_key: "storefront_seo", 
            setting_value: req.body,
            value_type: "json",
            category: "general",
            display_name: "Store Meta Information", 
            description: "This entry keeps your store meta information",
            is_active: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };
};

exports.setStorefrontComponents = async (req, res) => {
    // components:
    //  - hero (title, undertext, buttontext, imageurl)
    //  - categories 
    //  - newarrivals (none, latest created products)
    //  - doublehero (doublehero.components[0] left && doublehero.components[1]) (uppertext, title, buttontext, imageurl)
    //  - featured products [0,12,24,36] array of featured products
    //  - triplehero [triplehero[0] left && triplehero[1] middle && triplehero[2] right] (uppertext, title, buttontext, imageurl)
    //  - featurecards (...[2]) (icon, title, undertext, link)
    // footer has its own entry
    const body = {
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
    };
    try {
        const updateSettings = await models.StorefrontSettings.upsert({
            setting_key: "storefront_components", 
            setting_value: req.body,
            value_type: "json",
            display_name: "Store Component Props", 
            description: "This entry keeps your stores components",
            category: "layout",
            is_active: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };
};

exports.setCheckoutSettings = async (req, res) => {
    const {allowGuest, orderConfirmation, orderNotes, minimumOrderValue} = req.body;
    try {
        const updateSettings = await models.StorefrontSettings.upsert({
            setting_key: "storefront_checkout", 
            setting_value: req.body,
            value_type: "json",
            display_name: "Stores Checkout Settings", 
            description: "This entry keeps your stores checkout settings",
            category: "general",
            is_active: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };
};

exports.setShippingSettings = async (req, res) => {
const {freeShippingThreshold, displayShippingPrice, enableInternationalShipping} = req.body;

    try {
        const updateSettings = await models.StorefrontSettings.upsert({
            setting_key: "storefront_shipping", 
            setting_value: req.body,
            value_type: "json",
            display_name: "Stores Shipping Settings", 
            description: "This entry keeps your stores shipping settings",
            category: "general",
            is_active: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };
};

exports.setInventorySettings = async (req, res) => {
    const {lowStockThreshold, displayOutOfStock, lowStockNotifications, automaticInventoryUpdates, allowBackorders, stockStatusFormat, weeklyInventoryReports, productPerformanceAnalysis} = req.body;
    try {
        const updateSettings = await models.StorefrontSettings.upsert({
            setting_key: "storefront_inventory", 
            setting_value: req.body,
            value_type: "json",
            display_name: "Stores Inventory Settings", 
            description: "This entry keeps your stores inventory settings",
            category: "general",
            is_active: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };
};

exports.setAnalyticsSettings = async (req, res) => { // TODO: Add analytics settings.
    const {GATID, FBPID, cookieConsent, ipAnonymization, respectDoNotTrack} = req.body;
}