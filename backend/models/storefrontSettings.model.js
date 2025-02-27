const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class StorefrontSettings extends Model {}


StorefrontSettings.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    setting_key: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    setting_value: {
        type: DataTypes.TEXT
    },
    value_type: {
        type: DataTypes.ENUM('string', 'integer', 'boolean', 'json', 'array'),
        defaultValue: 'string',
        allowNull: false
    },
    display_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255)
    },
    category: {
        type: DataTypes.ENUM('general', 'layout', 'products', 'categories', 'promotions', 'marketing', 'seo'),
        defaultValue: 'general',
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'StorefrontSettings',
    tableName: 'storefront_settings',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
});


// example of the table structure:
// | id | setting_key               | setting_value                                      | value_type | display_name            | category    |
// |----|---------------------------|----------------------------------------------------| -----------|-------------------------|-------------|
// | 1  | hero_banner_image         | /assets/images/hero-banner-spring.jpg              | string     | Hero Banner Image       | layout      |
// | 2  | hero_banner_text          | Spring Sale: 20% Off All Garden Tools              | string     | Hero Banner Text        | layout      |
// | 3  | featured_product_ids      | [101, 203, 367, 489]                               | json       | Featured Products       | products    |
// | 4  | featured_categories       | [5, 12, 18]                                        | json       | Featured Categories     | categories  |
// | 5  | show_new_arrivals         | true                                               | boolean    | Show New Arrivals       | layout      |
// | 6  | new_arrivals_count        | 8                                                  | integer    | New Arrivals Count      | layout      |
// | 7  | homepage_layout           | {"sections":["hero","categories","featured","new"]}| json       | Homepage Layout Order   | layout      |
// | 8  | promotion_banner_active   | true                                               | boolean    | Show Promotion Banner   | promotions  |
// | 9  | newsletter_popup_enabled  | false                                              | boolean    | Enable Newsletter Popup | marketing   |
// | 10 | homepage_meta_title       | Premium Tools & Equipment - MyToolShop             | string     | SEO Meta Title          | seo         |
module.exports = StorefrontSettings;