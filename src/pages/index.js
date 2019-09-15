import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`

export default ({ data }) => {
  
  const { 
    allMarkdownRemark : { totalCount, edges } 
  } = data;

  return (
    <Layout>
      <SEO title="Home" />

      <div>
        <h1>Aevi Thoughts</h1>
        <h4>{totalCount} Posts</h4>
        {
          edges.map(({node}) => (
            <div key={node.id}>
              <BlogLink to={node.fields.slug}>
                <BlogTitle>{node.frontmatter.title} - {node.frontmatter.date}</BlogTitle>
              </BlogLink>
              <p>{node.excerpt}</p>
            </div>
          ))
        }
      </div>

      
    </Layout>
  )
}

export const query = graphql`
  query
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order:  DESC }) {
        edges {
          node {
            id
            frontmatter {
              description
              title
              date
            }
            fields {
              slug
            }
            html
            excerpt
          }
        }
        totalCount
      }
  }

`