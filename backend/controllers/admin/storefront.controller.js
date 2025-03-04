const { models } = require('../../models');

/**
 * Generic settings update function to reduce code duplication
 * @param {Object} data - Setting data to be saved
 * @param {string} key - Setting key identifier
 * @param {string} type - Value type (json/string)
 * @param {string} displayName - Human-readable setting name
 * @param {string} description - Description of this setting
 * @param {string} category - Setting category
 * @returns {Promise} - Promise resolving to updated setting
 */
const updateSetting = async (data, key, type, displayName, description, category) => {
  try {
    return await models.StorefrontSettings.upsert({
      setting_key: key,
      setting_value: data,
      value_type: type,
      display_name: displayName,
      description,
      category,
      is_active: true
    });
  } catch (error) {
    // Re-throw with additional context
    throw new Error(`Failed to update setting "${key}": ${error.message}`);
  }
};

/**
 * Validate required fields and return error message if invalid
 * @param {Object} data - Data to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {string|null} - Error message or null if valid
 */
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`;
  }
  
  return null;
};

/**
 * Standard error handler for API responses
 * @param {Object} res - Express response object
 * @param {Error} error - Error object
 * @param {string} operation - Description of operation that failed
 */
const handleError = (res, error, operation) => {
  console.error(`Error ${operation}:`, error);
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  
  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
};

/**
 * Success response handler
 * @param {Object} res - Express response object
 * @param {Object} data - Optional data to include in response
 * @param {string} message - Success message
 */
const handleSuccess = (res, data = null, message = 'Settings updated successfully') => {
  return res.status(200).json({
    data,
    meta: {
      success: true,
      message,
    }
  });
};

// Store Information
exports.setStoreInformation = async (req, res) => {
  try {
    const requiredFields = ['name', 'description', 'email', 'phone', 'address', 'currency', 'timezone', 'social'];
    const validationError = validateRequiredFields(req.body, requiredFields);
    
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }
    
    await updateSetting(
      req.body,
      'storefront_setup',
      'json',
      'Store Settings',
      'Essential information about your store',
      'general'
    );
    
    return handleSuccess(res, null, 'Store information updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating store information');
  }
};

// Store Domain
exports.setStoreDomain = async (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: 'Domain is required'
      });
    }
    
    await updateSetting(
      domain,
      'storefront_domain',
      'string',
      'Store Domain',
      'Your store domain',
      'general'
    );
    
    return handleSuccess(res, null, 'Store domain updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating store domain');
  }
};

// Store Theme
exports.setStoreTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    
    if (!theme) {
      return res.status(400).json({
        success: false,
        message: 'Theme is required'
      });
    }
    
    await updateSetting(
      theme,
      'storefront_theme',
      'string',
      'Store Theme',
      'Your store theme',
      'layout'
    );
    
    return handleSuccess(res, null, 'Store theme updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating store theme');
  }
};

// Store Colors
exports.setStoreColors = async (req, res) => {
  try {
    const { primary, secondary, accent, background } = req.body;
    const requiredFields = ['primary', 'secondary', 'accent', 'background'];
    const validationError = validateRequiredFields(req.body, requiredFields);
    
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }
    
    await updateSetting(
      req.body,
      'storefront_colors',
      'json',
      'Store Colors',
      'Your store color scheme',
      'layout'
    );
    
    return handleSuccess(res, null, 'Store colors updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating store colors');
  }
};

// SEO Settings
exports.setSeoSettings = async (req, res) => {
  try {
    await updateSetting(
      req.body,
      'storefront_seo',
      'json',
      'Store Meta Information',
      'SEO and meta information for your store',
      'general'
    );
    
    return handleSuccess(res, null, 'SEO settings updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating SEO settings');
  }
};

// Storefront Components
exports.setStorefrontComponents = async (req, res) => {
  try {
    await updateSetting(
      req.body,
      'storefront_components',
      'json',
      'Store Component Props',
      'Configuration for store components',
      'layout'
    );
    
    return handleSuccess(res, null, 'Storefront components updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating storefront components');
  }
};

// Checkout Settings
exports.setCheckoutSettings = async (req, res) => {
  try {
    await updateSetting(
      req.body,
      'storefront_checkout',
      'json',
      'Store Checkout Settings',
      'Configuration for checkout process',
      'general'
    );
    
    return handleSuccess(res, null, 'Checkout settings updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating checkout settings');
  }
};

// Shipping Settings
exports.setShippingSettings = async (req, res) => {
  try {
    await updateSetting(
      req.body,
      'storefront_shipping',
      'json',
      'Store Shipping Settings',
      'Configuration for shipping options',
      'general'
    );
    
    return handleSuccess(res, null, 'Shipping settings updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating shipping settings');
  }
};

// Inventory Settings
exports.setInventorySettings = async (req, res) => {
  try {
    await updateSetting(
      req.body,
      'storefront_inventory',
      'json',
      'Store Inventory Settings',
      'Configuration for inventory management',
      'general'
    );
    
    return handleSuccess(res, null, 'Inventory settings updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating inventory settings');
  }
};

// Analytics Settings
exports.setAnalyticsSettings = async (req, res) => {
  try {
    const { GATID, FBPID, cookieConsent, ipAnonymization, respectDoNotTrack } = req.body;
    
    await updateSetting(
      req.body,
      'storefront_analytics',
      'json',
      'Store Analytics Settings',
      'Configuration for analytics and tracking',
      'general'
    );
    
    return handleSuccess(res, null, 'Analytics settings updated successfully');
  } catch (error) {
    return handleError(res, error, 'updating analytics settings');
  }
};

// Get all settings (new function to retrieve settings)
exports.getAllSettings = async (req, res) => {
  try {
    const settings = await models.StorefrontSettings.findAll({
      where: { is_active: true }
    });
    
    // Transform into a more user-friendly format
    const formattedSettings = settings.reduce((acc, setting) => {
      // Parse JSON values if needed
      let value = setting.setting_value;
      if (setting.value_type === 'json') {
        try {
          value = typeof value === 'string' ? JSON.parse(value) : value;
        } catch (e) {
          console.error(`Failed to parse JSON for setting ${setting.setting_key}:`, e);
        }
      }
      
      acc[setting.setting_key] = {
        value,
        display_name: setting.display_name,
        description: setting.description,
        category: setting.category
      };
      
      return acc;
    }, {});
    
    return handleSuccess(res, formattedSettings, 'Settings retrieved successfully');
  } catch (error) {
    return handleError(res, error, 'retrieving settings');
  }
};

// Get a specific setting by key
exports.getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;
    
    if (!key) {
      return res.status(400).json({
        success: false,
        message: 'Setting key is required'
      });
    }
    
    const setting = await models.StorefrontSettings.findOne({
      where: {
        setting_key: key,
        is_active: true
      }
    });
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: `Setting with key "${key}" not found`
      });
    }
    
    // Parse JSON if needed
    let value = setting.setting_value;
    if (setting.value_type === 'json') {
      try {
        value = typeof value === 'string' ? JSON.parse(value) : value;
      } catch (e) {
        console.error(`Failed to parse JSON for setting ${key}:`, e);
      }
    }
    
    const formattedSetting = {
      key: setting.setting_key,
      value,
      display_name: setting.display_name,
      description: setting.description,
      category: setting.category
    };
    
    return handleSuccess(res, formattedSetting, 'Setting retrieved successfully');
  } catch (error) {
    return handleError(res, error, 'retrieving setting');
  }
};