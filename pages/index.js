import commerce from "../lib/commerce";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Product from "@/components/Product/Product";

export async function getStaticProps(context) {
  const { data: products } = await commerce.products.list();
  const { data: categories } = await commerce.categories.list();

  return {
    props: { products, categories },
    revalidate: 30,
  };
}

export default function Home({ products, categories, addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.container}>
      <Head>
        <title>Online Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          role="searchbox"
          type="text"
          title="Search"
          placeholder="Search products"
        />

        {searchTerm.length > 0 ? (
          <>
            <h2 id="search-results-heading">Search results</h2>
            <ul aria-labelledby="search-results-heading">
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => {
                  return (
                    <li key={product.id}>
                      {" "}
                      <Product
                        product={product}
                        addToCart={() => {
                          addToCart(product.id);
                        }}
                      />
                    </li>
                  );
                })}
            </ul>
          </>
        ) : (
          <>
            <ul aria-label="Categories">
              {categories.map((category) => {
                return (
                  <li aria-label="category" key={category.id}>
                    <h2 id={`category-${category.name}`}>{category.name}</h2>
                    <ul aria-labelledby={`category-${category.name}`}>
                      {products
                        .filter((product) =>
                          product.categories.find((c) => c.id === category.id)
                        )
                        .map((product) => {
                          return (
                            <li key={product.id}>
                              {" "}
                              <Product
                                product={product}
                                addToCart={() => {
                                  addToCart(product.id);
                                }}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <h2 id="all-products-heading">All Products</h2>
            <ul aria-labelledby="all-products-heading">
              {products.map((product) => {
                return (
                  <li key={product.id}>
                    <Product
                      product={product}
                      addToCart={() => {
                        addToCart(product.id);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </main>

      <footer className={styles.footer}>Made by Abhik B</footer>
    </div>
  );
}
