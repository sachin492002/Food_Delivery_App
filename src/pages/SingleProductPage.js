import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { AddToCart, Stars, PageHero } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const SingleProductPage = () => {
  const { id } = useParams();
  const url=`https://fsdassignment2.vercel.app/items/`
  const { single_product_loading: loading, single_product_error: error, single_product: product, fetchSingleProduct } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);


  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  const { name, price, description,vegan, stock, id: sku, restaurent, image } = product;

  return (
      <Wrapper>
        <PageHero title={name} product />
        <div className='section section-center page'>
          <Link to='/products' className='btn'>
            back to products
          </Link>
          <div className='product-center'>
            <img src={image} alt='main' className='main' />
            <section className='content'>
              <h2>{name}</h2>
              <Stars stars={(Math.random() * 5)+1} reviews={Math.floor(Math.random()*200)+1} />
              <h5 className='price'>{price}</h5>
              <p className='desc display-linebreak'>{description}</p>
              <p className='info'>
                <span>Availability : </span>
                {stock > 0 ? `In Stock (${stock})` : 'out of stock'}
              </p>
              <p className='info'>
                <span>Food Type : </span>
                {vegan}
              </p>
              <p className='info'>
                <span>Restaurent : </span>
                {restaurent}
              </p>
              <hr />
              {stock > 0 && <AddToCart product={product} />}
            </section>
          </div>
        </div>
      </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .display-linebreak {
    white-space: pre-line;
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  .main {
    height: 100%;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: contain;
  }
  
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
