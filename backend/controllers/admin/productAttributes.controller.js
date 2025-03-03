const { models } = require("../../models")

exports.createAttribute = async (req,res) => {
    try {
        console.log(req.body)
        const {variant_id, key, value, display_order, is_filterable, attribute_type} = req.body
        const attribute = await models.ProductAttribute.create(
            {
                variant_id: variant_id, 
                key: key, 
                value: value, 
                display_order: display_order,
                is_filterable: is_filterable,
                attribute_type: attribute_type
            });
            res.status(200).json(attribute);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.editAttribute = async (req,res) => {
    try {
        const attribute = await models.ProductAttribute.update(req.body, {where: {attribute_id: req.body.id}});
            res.status(200).json(attribute);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

exports.deleteAttribute = async (req, res) => {
    try {
        console.log(req)
        const attribute = await models.ProductAttribute.destroy({where: {attribute_id: req.body.id}});
            res.status(200).json({message: "Attribute deleted succesfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};