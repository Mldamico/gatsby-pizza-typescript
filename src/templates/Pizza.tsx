import { graphql } from "gatsby";
import React from "react";
import { SinglePizzaBySlugQuery } from "../../graphql-types";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

const PizzaGridStyle = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SinglePizza = ({ data }: { data: SinglePizzaBySlugQuery }) => {
  const { pizza } = data;

  return (
    <PizzaGridStyle>
      <GatsbyImage image={pizza.image.asset.gatsbyImageData} alt={pizza.name} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGridStyle>
  );
};

export default SinglePizza;

export const query = graphql`
  query SinglePizzaBySlug($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      toppings {
        name
        id
        vegetarian
      }
      image {
        asset {
          gatsbyImageData(width: 800)
        }
      }
    }
  }
`;
