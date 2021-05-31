import { graphql } from "gatsby";
import React from "react";
import { PizzaList } from "../components/PizzaList";
import { ToppingsFilter } from "../components/ToppingsFilter";

const PizzasPage = ({ data }) => {
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={data} />
    </>
  );
};

export const query = graphql`
  query Pizzas {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            gatsbyImageData(width: 400)
          }
        }
      }
    }
  }
`;

export default PizzasPage;
