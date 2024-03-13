import React, {createContext, useContext, useState} from 'react';

const ProductsContext = createContext();

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    const saveProduct = (products) => {
        setProducts(currentProducts => {
            const index = currentProducts.findIndex(p => p.id === products.id);

            if (index !== -1) {
                const newProducts = [...currentProducts];
                newProducts[index] = products;
                return newProducts;
            } else {
                const newProducts = products.id ? products : {...products, id: Date.now()};
                return [...currentProducts, newProducts];
            }
        });
    };

    return (
        <ProductsContext.Provider value={{products, saveProduct}}>
            {children}
        </ProductsContext.Provider>
    );
}