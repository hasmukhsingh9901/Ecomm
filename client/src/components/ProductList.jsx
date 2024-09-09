import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import useProductStore  from "../store/useProductStore";

const ProductsList = () => {
	// Get the necessary store actions and state (deleteProduct, toggleFeaturedProduct, products) from the product store.
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	console.log("products", products); // Log the products to check if they are properly fetched from the store.

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }} // Initial animation state: slightly transparent and shifted down.
			animate={{ opacity: 1, y: 0 }} // Final animation state: fully opaque and positioned correctly.
			transition={{ duration: 0.8 }} // Duration of the animation (0.8 seconds).
		>
			{/* Table to display the list of products */}
			<table className=' min-w-full divide-y divide-gray-700'>
				{/* Table header */}
				<thead className='bg-gray-700'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Product
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Price
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Category
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Featured
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Actions
						</th>
					</tr>
				</thead>

				{/* Table body */}
				<tbody className='bg-gray-800 divide-y divide-gray-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-gray-700'>
							{/* Product information */}
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										{/* Display product image */}
										<img
											className='h-10 w-10 rounded-full object-cover'
											src={product.image} // Product image source
											alt={product.name} // Alternative text
										/>
									</div>
									<div className='ml-4'>
										{/* Product name */}
										<div className='text-sm font-medium text-white'>{product.name}</div>
									</div>
								</div>
							</td>
							{/* Product price */}
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
							</td>
							{/* Product category */}
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>{product.category}</div>
							</td>
							{/* Featured product toggle button */}
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)} // Toggle featured status when clicked
									className={`p-1 rounded-full ${
										product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
									} hover:bg-yellow-500 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							{/* Delete product button */}
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)} // Delete the product when clicked
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};

export default ProductsList;
