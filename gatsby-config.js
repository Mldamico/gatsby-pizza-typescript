import dotenv from 'dotenv'

dotenv.config({path:'.env'});

module.exports = {
  siteMetadata: {
    title: `Pizza Page`,
    siteUrl: 'http://pizza.page',
    description: 'Pizza page description'
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        // Sanity project info (required)
        projectId: 'ebmb5db0',
        dataset: 'production',
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: 'ebmb5db0',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-typescript`,
    },
    `gatsby-plugin-graphql-codegen`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    
  ],
}