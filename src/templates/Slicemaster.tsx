import { graphql } from "gatsby";
import React from "react";
import { SingleSlicemasterBySlugQuery } from "../../graphql-types";
import { GatsbyImage } from "gatsby-plugin-image";

const SingleSlicemaster = ({
  data,
}: {
  data: SingleSlicemasterBySlugQuery;
}) => {
  const { slicemaster } = data;

  return (
    <div className="center">
      <GatsbyImage
        image={slicemaster.image.asset.gatsbyImageData}
        alt={slicemaster.name}
      />
      <h2>
        <span className="mark">{slicemaster.name}</span>
      </h2>
      <p>{slicemaster.description}</p>
    </div>
  );
};

export default SingleSlicemaster;

export const query = graphql`
  query SingleSlicemasterBySlug($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          gatsbyImageData(width: 1000, height: 750)
        }
      }
    }
  }
`;
