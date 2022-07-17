const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const {
	tagSerializerAll,
	tagSerializerOne,
} = require("../../utils/tagSerializer");
// The `/api/tags` endpoint

router.get("/", (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	Tag.findAll({
		include: [
			{
				// model: ProductTag,
				// attributes: ["product_id"],
				// as: "products"
				// as: "products",
				// include: {
				model: Product,
				as: "products",
				// }
			},
		],
	})
		.then((tags) => {
			console.log(tags);
			return res.json(tagSerializerAll(tags));
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	Tag.findOne({
		where: {
			id: req.params.id,
		},
		include: {
			model: Product,
			as: "products",
		},
	})
		.then((tags) => {
			if (!tags) {
				res.status(404).json({ message: "No tags with this id found" });
				return;
			}
			return res.json(tagSerializerOne(tags));
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	// create a new tag
	Tag.create({
		tag_name: req.body.tag_name,
	})
		.then((tag) => res.status(200).json(tag))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.put("/:id", (req, res) => {
	// update a tag's name by its `id` value
	Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((tag) => {
			if (!tag) {
				res.status(404).json({ message: "No tag with this id found" });
				return;
			}
			Tag.findAll({ where: { id: req.params.id } })
			.then((tag) => res.json(tag))
		})
		.catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
	Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
	.then((tag)=> {
		if(!tag){
			res.status(404).json({message:"No tag with this id found"});
			return;
 		}
		res.json(tag)
	})
	.catch((err)=>{
		console.log(err);
		res.status(500).json(err);
	});
});


module.exports = router;
