import path, { resolve } from "path";
import fetch from "isomorphic-fetch";



const turnPizzasIntoPages = async ({
  graphql,
  actions,
}) => {
  const pizzaTemplate = path.resolve("./src/templates/Pizza.tsx");
  const {data}= await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};


const turnToppingsIntoPages = async ({
  graphql,
  actions,
}) => {
  const toppingTemplate = path.resolve("./src/pages/pizza.tsx");
  const {data}= await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
};



const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const res = await fetch("https://api.sampleapis.com/beers/ale");
  const beers = await res.json();
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: "Beer",
        mediaType: "application/json",
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
};

export const sourceNodes = async (params) => {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};

const turnSlicemastersIntoPages = async({graphql, actions}) => {
  const {data}= await graphql(`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
      }
    }
  }
`);

  data.slicemasters.nodes.forEach(slicemaster => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.tsx'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current

      }
    })
  })

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  Array.from({length: pageCount}).forEach((_,i) => {
    actions.createPage({
      path: `/slicemasters/${i+1}`,
      component: path.resolve('./src/pages/slicemasters.tsx'),
      context: {
        skip: i * pageSize,
        currentPage: i +1,
        pageSize
      }
    })
  }
    
  );
}

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params)
  ]);
};
