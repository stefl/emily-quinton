import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from "gatsby-background-image"
import Image from 'gatsby-image'
import SharingIcons from '../components/SharingIcons'

function useMedia(queries, values, defaultValue) {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
}

function IndexPage({data}) {
  const image = data.file.childImageSharp.fluid

  const breakpoint = useMedia(
    // Media queries
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    // Column counts (relates to above media queries by array index)
    [4, 3, 2],
    // Default column count
    1
  );

  return (
    <Layout>
      <SEO
        keywords={[`emily`, `quinton`]}
        title="Emily Quinton"
      />

      {(breakpoint > 2) && <div className="fixed w-100 h-screen top-0 left-0 right-0 bottom-0" style={{zIndex: '-1'}}>
        <div className="w-100 h-screen flex">
          <BackgroundImage fluid={image} className="flex flex-row flex-1" />
          <div className="flex flex-row flex-1" />
        </div>
      </div>}

      <div className="flex font-sans min-h-screen text-gray-900">
        {(breakpoint > 2) && <div className="flex flex-row flex-1" />}
        
        <main className="flex flex-row flex-1 justify-center max-w-4xl mx-auto md:p-8 w-full">


          <section className="text-left p-5">
            <div className="max-w-md mx-auto">
              {(breakpoint <= 2) && <Image fluid={image} className="w-full" />}
              {(breakpoint > 2) && <hr className="font-display max-w-xs mx-auto border-b border-gray-400 mb-12" />}

              <div className="mb-12">
                <h1 className="font-display text-2xl tracking-widest text-center mt-12">Emily Quinton</h1>
                <h2 className="font-display text-l tracking-widest text-center mt-12">Personal growth, family, creativity, balance, neurodiversity</h2>
                <SharingIcons />
              </div>

              <hr className="font-display max-w-xs mx-auto border-b border-gray-400 mb-12" />
              
              <div className="font-display">
                <p className="leading-loose mb-4">
                  Hello! It’s lovely to have you here in my little corner of the internet, where I aim to bring you joy, creativity, inspiration and plenty of love. 
                </p>

                <p className="leading-loose mb-4">
                  I’m Emily Quinton and I live in London, UK with my husband Stef and our four children. We are a family that brings together the neurodiverse and the neurotypical to build a beautiful, strong, creative unit where we aim to grow alongside each other and inspire you to do the same. 
                </p>
                
                <p className="leading-loose mb-4">
                  For the past few years I have been committed to personal growth. As I have learnt new things and gone deeper into knowing myself and my purpose, I have felt a huge pull to share this with my family. Meditation, gratitude practice, mindfulness, positive affirmations, connection to nature, alongside daily creativity fill our home. 
                </p>

                <p className="leading-loose">
                  Through my writing, my creativity and my online courses I hope to inspire you to grow with your family and help you to live your best lives with all your heart. 
                </p>
              </div>

              <hr className="font-display max-w-xs mx-auto border-b border-gray-400 mt-24 mb-12" />

              <div className="font-display mt-24 mb-24">
                <div className="mb-12">
                  <h1 className="font-display text-2xl tracking-widest text-center mt-12">Links</h1>
                  <h2 className="font-display text-l tracking-widest text-center mt-6">Here’s where you can find me online</h2>
                </div>
              </div>

              <div className="font-display text-center">

                <h2 className="text-2xl mb-4"><a href="https://www.allsortsoflovely.com">Journal</a></h2>
                <h2 className="text-2xl mb-4"><a href="https://www.allsortsoflovely.com/newsletter">Monthly inspiration</a></h2>
                <h2 className="text-2xl mb-4"><a href="https://www.amazon.co.uk/Maker-Spaces-interiors-inspiring-designers/dp/1849756198/ref=sr_1_1?keywords=maker+spaces&qid=1582398595&sr=8-1">Books</a></h2>
                <h2 className="text-2xl mb-4"><a href="https://www.youtube.com/channel/UCk7Hr3lXAxNYvlPN19wiXRQ">Videos</a></h2>
                <h2 className="text-2xl mb-4">(Courses coming again soon)</h2>
              </div>

            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    file(relativePath: { eq: "images/emily-quinton.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;
