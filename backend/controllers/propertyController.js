// // backend/controllers/propertyController.js
// const Property = require("../models/Property");

// exports.createProperty = async (req, res) => {
//   try {
//     const property = new Property({ ...req.body, owner: req.userId });
//     await property.save();
//     res.status(201).send({ message: "Property created successfully" });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// exports.getProperties = async (req, res) => {
//   try {
//     const properties = await Property.find();
//     res.send(properties);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.getProperty = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id).populate(
//       "owner",
//       "firstName lastName email phone"
//     );
//     if (!property) {
//       return res.status(404).send({ message: "Property not found" });
//     }
//     res.send(property);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.updateProperty = async (req, res) => {
//   try {
//     const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!property) {
//       return res.status(404).send({ message: "Property not found" });
//     }
//     res.send(property);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// exports.deleteProperty = async (req, res) => {
//   try {
//     const property = await Property.findByIdAndDelete(req.params.id);
//     if (!property) {
//       return res.status(404).send({ message: "Property not found" });
//     }
//     res.send({ message: "Property deleted successfully" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
// backend/controllers/propertyController.js
// exports.getProperties = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;

//   try {
//     const properties = await Property.find()
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();
//     const count = await Property.countDocuments();

//     res.json({
//       properties,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
// backend/controllers/propertyController.js
const sendEmail = require("../utils/email");

exports.contactSeller = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner");
    if (!property) {
      return res.status(404).send({ message: "Property not found" });
    }

    const buyer = await User.findById(req.userId);

    const sellerEmail = property.owner.email;
    const buyerEmail = buyer.email;

    sendEmail(
      sellerEmail,
      "Interested Buyer",
      `A buyer is interested in your property: ${property.place}`
    );
    sendEmail(
      buyerEmail,
      "Property Contact Details",
      `Contact details of the seller: ${property.owner.email}, ${property.owner.phone}`
    );

    res.send({ message: "Contact details sent to your email" });
  } catch (error) {
    res.status(500).send(error);
  }
};
