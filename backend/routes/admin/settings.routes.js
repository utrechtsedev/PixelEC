const express = require('express');
const router = express.Router();
const { getAllSettings, getSettingByKey, setStoreInformation, setStoreDomain, setStoreTheme, setStoreColors, setSeoSettings, setStorefrontComponents, setCheckoutSettings, setShippingSettings, setInventorySettings, setAnalyticsSettings } = require('../../controllers/admin/storefront.controller');

/**
 * @route   GET /api/settings
 * @desc    Get all store settings
 * @access  Admin
 */
router.get('/', (req, res) => getAllSettings(req, res));

/**
 * @route   GET /api/settings/:key
 * @desc    Get a specific setting by key
 * @access  Admin
 */
router.get('/:key', (req, res) => getSettingByKey(req, res));

/**
 * @route   PUT /api/settings/store-info
 * @desc    Update store information
 * @access  Admin
 */
router.put('/store-info', (req, res) => setStoreInformation(req, res));

/**
 * @route   PUT /api/settings/domain
 * @desc    Update store domain
 * @access  Admin
 */
router.put('/domain', (req, res) => setStoreDomain(req, res));

/**
 * @route   PUT /api/settings/theme
 * @desc    Update store theme
 * @access  Admin
 */
router.put('/theme', (req, res) => setStoreTheme(req, res));

/**
 * @route   PUT /api/settings/colors
 * @desc    Update store colors
 * @access  Admin
 */
router.put('/colors', (req, res) => setStoreColors(req, res));

/**
 * @route   PUT /api/settings/seo
 * @desc    Update SEO settings
 * @access  Admin
 */
router.put('/seo', (req, res) => setSeoSettings(req, res));

/**
 * @route   PUT /api/settings/components
 * @desc    Update storefront components
 * @access  Admin
 */
router.put('/components', (req, res) => setStorefrontComponents(req, res));

/**
 * @route   PUT /api/settings/checkout
 * @desc    Update checkout settings
 * @access  Admin
 */
router.put('/checkout', (req, res) => setCheckoutSettings(req, res));

/**
 * @route   PUT /api/settings/shipping
 * @desc    Update shipping settings
 * @access  Admin
 */
router.put('/shipping', (req, res) => setShippingSettings(req, res));

/**
 * @route   PUT /api/settings/inventory
 * @desc    Update inventory settings
 * @access  Admin
 */
router.put('/inventory', (req, res) => setInventorySettings(req, res));

/**
 * @route   PUT /api/settings/analytics
 * @desc    Update analytics settings
 * @access  Admin
 */
router.put('/analytics', (req, res) => setAnalyticsSettings(req, res));

module.exports = router;