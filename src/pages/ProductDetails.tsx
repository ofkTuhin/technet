import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetSingleProductQuery } from '@/redux/api/apiSlice';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  // ! Temporary code, should be replaced with redux

  const { data: product } = useGetSingleProductQuery(id);
  console.log(product);
  //! Temporary code ends here

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.result?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.result?.name}</h1>
          <p className="text-xl">Rating: {product?.result?.rating}</p>
          <ul className="space-y-1 text-lg ">
            {product?.result?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview />
    </>
  );
}
