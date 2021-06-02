import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import { SanityPizza, SanityTopping } from "../../graphql-types";

interface ToppingPizzaCount {
  id: string;
  name: string;
  count: number;
}

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;

    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current="page"] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas: SanityPizza[]) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc: { [key: string]: ToppingPizzaCount }, topping) => {
      const existingTopping: ToppingPizzaCount = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});

  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export const ToppingsFilter = ({
  activeTopping,
}: {
  activeTopping: string;
}) => {
  const { pizzas } = useStaticQuery(graphql`
    query Toppings {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  const toppingsWithCounts: ToppingPizzaCount[] = countPizzasInToppings(
    pizzas.nodes
  );
  return (
    <ToppingsStyles>
      <Link to="/pizza">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          to={`/topping/${topping.name}`}
          key={topping.id}
          className={topping.name === activeTopping ? "active" : ""}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};
