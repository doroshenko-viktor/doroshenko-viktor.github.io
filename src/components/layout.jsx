import * as React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  const data = useStaticQuery(graphql`
    query EmailQuery {
      site {
        siteMetadata {
          social {
            email
          }
        }
      }
    }
  `)
  const contactEmail = data?.site?.siteMetadata?.social?.email;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <div>
          {contactEmail ?
            <div className="footer-email">For contacts:
              {' '}
              <a href={"mailto:" + contactEmail}>{contactEmail}</a>
            </div>
            : null}

          © {new Date().getFullYear()}, Built with
          {' '}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
