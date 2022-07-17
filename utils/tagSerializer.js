function tagSerializerAll(rawtagData) {
	const tagsData = rawtagData.map(({ dataValues }) => ({
		...dataValues,
	}));
	return tagsData.map((tag) => ({
		...tag,
		products: tag.products.map(
			({ id, product_name, price, stock, category_id }) => ({
				id,
				product_name,
				price,
				stock,
				category_id,
			})
		),
	}));
}
function tagSerializerOne(rawtagData) {
	const serializedProducts = rawtagData.products.map(
		({ id, product_name, price, stock, category_id }) => ({
			id,
			product_name,
			price,
			stock,
			category_id,
		})
	);
	const returnTag = {
		id: rawtagData.id,
		tag_name: rawtagData.tag_name,
                products: serializedProducts
	};

	return returnTag;
}

module.exports = { tagSerializerAll, tagSerializerOne };
