import { graphql } from "gatsby";
import React from "react";
import { PizzasInOrderQuery } from "../../graphql-types";
import { SEO } from "../components/SEO";
import { useForm } from "../utils/useForm";
import { GatsbyImage } from "gatsby-plugin-image";
import { calculatePizzaPrice } from "../utils/calculatePizzaPrice";
import { formatMoney } from "../utils/formatMoney";
const OrderPage = ({ data }: { data: PizzasInOrderQuery }) => {
  const { values, updateValue } = useForm({ name: "", email: "" });
  return (
    <>
      <SEO title="Order a Pizza!" />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              id="name"
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          {data.pizzas.nodes.map((pizza) => (
            <div key={pizza.id}>
              <GatsbyImage
                image={pizza.image.asset.gatsbyImageData}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              {["S", "M", "L"].map((size) => (
                <button type="button" key={size}>
                  {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                </button>
              ))}
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
};

export default OrderPage;

export const query = graphql`
  query PizzasInOrder($toppingRegex: String) {
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
            gatsbyImageData(width: 100)
          }
        }
      }
    }
  }
`;
