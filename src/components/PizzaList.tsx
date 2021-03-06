import { Link } from "gatsby";
import React from "react";
import { PizzasQuery, SanityPizza } from "../../graphql-types";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  gap: 1rem;

  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }: { pizza: SanityPizza; key: String }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(", ")}</p>
      <GatsbyImage image={pizza.image.asset.gatsbyImageData} alt={pizza.name} />
    </PizzaStyles>
  );
}

export const PizzaList = ({ pizzas }: { pizzas: PizzasQuery }) => {
  return (
    <PizzaGridStyles>
      {pizzas.pizzas.nodes.map((p: SanityPizza) => (
        <SinglePizza key={p.id} pizza={p} />
      ))}
    </PizzaGridStyles>
  );
};
