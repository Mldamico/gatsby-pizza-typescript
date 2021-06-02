import { graphql, Link } from "gatsby";
import React from "react";
import { SlicemastersQuery } from "../../graphql-types";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Pagination } from "../components/Pagination";

const SlicemasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  text-decoration: none;
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const SlicemastersPage = ({
  data,
  pageContext,
}: {
  data: SlicemastersQuery;
  pageContext: { pageSize: number; skip: number; currentPage: number };
}) => {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {slicemasters.map((person) => (
          <SlicemasterStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <GatsbyImage
              image={person.image.asset.gatsbyImageData}
              alt={person.name}
            />
            <p className="description">{person.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
};

export default SlicemastersPage;

export const query = graphql`
  query Slicemasters($skip: Int = 0, $pageSize: Int = 4) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            gatsbyImageData(width: 410)
          }
        }
      }
    }
  }
`;
