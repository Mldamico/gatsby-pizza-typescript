import { graphql } from "gatsby";
import React from "react";
import { PizzasQuery } from "../../graphql-types";
import { PizzaList } from "../components/PizzaList";
import { SEO } from "../components/SEO";
import { ToppingsFilter } from "../components/ToppingsFilter";

const PizzasPage = ({
  data,
  pageContext,
}: {
  data: PizzasQuery;
  pageContext: { topping: string };
}) => {
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      />
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
