import { graphql } from "gatsby";
import React from "react";
import { PizzaList } from "../components/PizzaList";
import { ToppingsFilter } from "../components/ToppingsFilter";

const PizzasPage = ({ data, pageContext }) => {
  return (
    <>
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={data} />
    </>
  );
};

export const query = graphql`
  query Pizzas($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
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
