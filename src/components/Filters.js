import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';


const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);

    if (type === 'colors') {
        unique = unique.flat();
    }
    return ['all', ...new Set(unique)];
};

const Filters = () => {
    const {
        filters: {
            text,
            category,
            min_price,
            price,
            max_price,

        },
        updateFilters,
        clearFilters,
        all_products,
    } = useFilterContext();
  const categories = getUniqueValues(all_products, 'category');



    return (
        <Wrapper>
            <div className="content">
                <form onSubmit={(e) => e.preventDefault()}>

                    <div className="form-control">
                        <input
                            type="text"
                            name="text"
                            placeholder="search"
                            className="search-input"
                            value={text}
                            onChange={updateFilters}
                        />
                    </div>
                </form>
            </div>

            <div className="form-control">
                <h5>category</h5>
                <div>
                    {categories.map((c, index) => {
                        return (
                            <button
                                key={index}
                                onClick={updateFilters}
                                type="button"
                                name="category"
                                className={`${category === c.toLowerCase() ? 'active' : null}`}
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>
            </div>


            <div className="form-control">
                <h5>price</h5>
                <p className="price">{(price)}Rs</p>
                <input
                    type="range"
                    name="price"
                    onChange={updateFilters}
                    min={min_price}
                    max={max_price}
                    value={price}
                />
            </div>

            <button type="button" className="clear-btn" onClick={clearFilters}>
                clear filters
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    
    cursor: pointer;
  }
  
  
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  
  .clear-btn {
    background: var(--clr-red-dark);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
