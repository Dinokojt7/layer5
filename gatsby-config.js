/* eslint-env node */

module.exports = {
  siteMetadata: {
    title: "Layer5 - Expect more from your infrastructure",
    description:
      "Expect more from your infrastructure. Cloud native, open source software for your cloud native infrastructure and applications. Allowing developers to focus on business logic, not infrastructure concerns. Empowering operators to confidently run modern infrastructure.",
    author: "Layer5 Authors",
    permalink: "https://layer5.io",
    siteUrl: "https://layer5.io",
    image: "/images/layer5-gradient.webp",
    twitterUsername: "@layer5",
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  trailingSlash: "never",
  plugins: [
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/*": [
            "X-Frame-Options: SAMEORIGIN",
            "Content-Security-Policy: frame-ancestors 'self'",
          ],
        },
        mergeSecurityHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        disable: true,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
              matchPath
            }
          }
          site {
            siteMetadata {
              siteUrl
              }
          }
        }
      `,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            return { ...page };
          });
        },
        serialize: ({ path, matchPath }) => {
          let url = matchPath ? matchPath : path;
          url = url.startsWith("/") ? url : `/${url}`;
          return {
            url: url,
            changefreq: "daily",
            priority: 0.7,
          };
        },
      },
    },
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgo: true,
        svgoConfig: {
          plugins: [
            "prefixIds",
            {
              name: "preset-default",
              params: {
                overrides: {
                  // or disable plugins
                  inlineStyles: false,
                  cleanupIds: false,
                },
              },
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPosts } }) => {
              return allPosts.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  author: node.frontmatter.author,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  enclosure: node.frontmatter.thumbnail && {
                    url:
                      site.siteMetadata.siteUrl +
                      node.frontmatter.thumbnail.publicURL,
                  },
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `{
  allPosts: allMdx(
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {collection: {in: ["blog", "resources", "news"]}}, frontmatter: {published: {eq: true}, category: {nin: ["Programs", "Community", "Events", "FAQ"]}}}
    limit: 20
  ) {
    nodes {
      body
      html
      frontmatter {
        title
        author
        description
        date(formatString: "MMM DD YYYY")
        thumbnail {
          publicURL
        }
      }
      fields {
        collection
        slug
      }
    }
  }
}`,
            output: "/rss.xml",
            title: "Layer5 Technical Posts",
          },
          {
            serialize: ({ query: { site, allPosts } }) => {
              return allPosts.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  author: node.frontmatter.author,
                  description: node.body,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  enclosure: node.frontmatter.thumbnail && {
                    url:
                      site.siteMetadata.siteUrl +
                      node.frontmatter.thumbnail.publicURL,
                  },
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `{
  allPosts: allMdx(
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {collection: {in: ["news"]}}, frontmatter: {published: {eq: true}}}
    limit: 20
  ) {
    nodes {
      body
      html
      frontmatter {
        title
        author
        date(formatString: "MMM DD YYYY")
        thumbnail {
          publicURL
        }
      }
      fields {
        collection
        slug
      }
    }
  }
}`,
            output: "/news/feed.xml",
            title: "Layer5 News",
          },
          {
            serialize: ({ query: { site, allPosts } }) => {
              return allPosts.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  author: node.frontmatter.author,
                  description: node.body,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  enclosure: node.frontmatter.thumbnail && {
                    url:
                      site.siteMetadata.siteUrl +
                      node.frontmatter.thumbnail.publicURL,
                  },
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `{
  allPosts: allMdx(
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {collection: {in: ["resources"]}}, frontmatter: {published: {eq: true}}}
    limit: 20
  ) {
    nodes {
      body
      html
      frontmatter {
        title
        author
        date(formatString: "MMM DD YYYY")
        thumbnail {
          publicURL
        }
        darkthumbnail {
          publicURL
        }
      }
      fields {
        collection
        slug
      }
    }
  }
}`,
            output: "/resources/feed.xml",
            title: "Layer5 Resources",
          },
          {
            serialize: ({ query: { site, allPosts } }) => {
              return allPosts.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  author: node.frontmatter.author,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  enclosure: node.frontmatter.thumbnail && {
                    url:
                      site.siteMetadata.siteUrl +
                      node.frontmatter.thumbnail.publicURL,
                  },
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `{
  allPosts: allMdx(
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {collection: {in: ["blog", "news"]}}, frontmatter: {published: {eq: true}}}
    limit: 20
  ) {
    nodes {
      body
      html
      frontmatter {
        title
        author
        description
        date(formatString: "MMM DD YYYY")
        thumbnail {
          publicURL
        }
      }
      fields {
        collection
        slug
      }
    }
  }
}`,
            output: "/rss-contributors.xml",
            title: "Layer5 Contributor Feed",
          },
          {
            serialize: ({ query: { site, allPosts } }) => {
              return allPosts.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  author: node.frontmatter.author,
                  description:
                    node.frontmatter.description || node.frontmatter.subtitle,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  enclosure: node.frontmatter.thumbnail && {
                    url:
                      site.siteMetadata.siteUrl +
                      node.frontmatter.thumbnail.publicURL,
                  },
                  custom_elements: [
                    { "content:encoded": node.html },
                    { "content:type": node.frontmatter.type },
                    { "content:category": node.frontmatter.category },
                    { "content:tags": node.frontmatter.tags?.join(", ") || "" },
                  ],
                });
              });
            },
            query: `{
  allPosts: allMdx(
    sort: {frontmatter: {date: DESC}}
    filter: {
      fields: {collection: {in: ["blog", "resources", "news", "events"]}}, 
      frontmatter: {
      published: { eq: true }
      category: { in: ["Meshery", "Announcements", "Events"] }
      tags: { in: ["Community", "Meshery", "mesheryctl"] }
    }
    }
    limit: 30
  ) {
    nodes {
      body
      html
      frontmatter {
        title
        author
        description
        subtitle
        date(formatString: "MMM DD YYYY")
        type
        category
        thumbnail {
          publicURL
        }
        tags
      }
      fields {
        collection
        slug
      }
    }
  }
}`,
            output: "/meshery-community-feed.xml",
            title: "Meshery RSSFeed",
          },
          {
            serialize: ({ query: { site, allPosts } }) => {
              return allPosts.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  author: node.frontmatter.author,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  enclosure: node.frontmatter.thumbnail && {
                    url:
                      site.siteMetadata.siteUrl +
                      node.frontmatter.thumbnail.publicURL,
                  },
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `{
  allPosts: allMdx(
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {collection: {in: ["blog"]}}, frontmatter: {published: {eq: true}}}
    limit: 20
  ) {
    nodes {
      body
      html
      frontmatter {
        title
        author
        description
        date(formatString: "MMM DD YYYY")
        thumbnail {
          publicURL
        }
      }
      fields {
        collection
        slug
      }
    }
  }
}`,
            output: "/blog/feed.xml",
            title: "Layer5 Blog",
          },
          {
            serialize: ({ query: { site, allPosts } }) => {
              return allPosts.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  author: node.frontmatter.author,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  enclosure: node.frontmatter.thumbnail && {
                    url:
                      site.siteMetadata.siteUrl +
                      node.frontmatter.thumbnail.publicURL,
                  },
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `{
  allPosts: allMdx(
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {collection: {in: ["events"]}}, frontmatter: {published: {eq: true}}}
    limit: 20
  ) {
    nodes {
      body
      html
      frontmatter {
        title
        author
        description
        date(formatString: "MMM DD YYYY")
        thumbnail {
          publicURL
        }
      }
      fields {
        collection
        slug
      }
    }
  }
}`,
            output: "/events/feed.xml",
            title: "Layer5 Events",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        minify: false,
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -50,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/news`,
        name: "news",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/projects`,
        name: "projects",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/service-mesh-books`,
        name: "service-mesh-books",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/programs`,
        name: "programs",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/careers`,
        name: "careers",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/members`,
        name: "members",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/workshops`,
        name: "workshops",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/service-mesh-labs`,
        name: "service-mesh-labs",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/resources`,
        name: "resources",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/events`,
        name: "events",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content-learn`,
        name: "content-learn",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/integrations`,
        name: "integrations",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/use-cases`,
        name: "use-cases",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "integration-images",
        path: `${__dirname}/src/sections/Meshery/Meshery-platforms/supported-icons`,
      },
    },
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "blurred",
        },
      },
    },
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        checkSupportedExtensions: false, // suppress warning about childImageSharp being null
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#3c494f",
        theme_color: "#00b39f",
        display: "minimal-ui",
        icon: "src/assets/images/favicon.webp", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-redirect-from",
      options: {
        query: "allMdx",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://layer5.io",
        sitemap: "https://layer5.io/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    "gatsby-plugin-meta-redirect",
    // make sure this is always the last one
  ],
};
