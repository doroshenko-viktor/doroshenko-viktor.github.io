import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const FolderTemplate = ({ data, location }) => {
  console.log(location);
  const foldersListElements = data.allDirectory.edges.map(edge => {
    return (
      <li key={edge.node.id}>
        <Link to={`/folders/${edge.node.relativePath}`}><h2>{edge.node.name}</h2></Link>
      </li>
    );
  });
  return (
    <ul>
      {foldersListElements}
    </ul>
  );
}

export const pageQuery = graphql`
query FoldersQuery {
    allDirectory(filter: {relativeDirectory: {eq: ""}}) {
      edges {
        node {
          id
          name
          relativePath
          relativeDirectory
        }
      }
    }
  }
`

export default FolderTemplate

