import React from "react"
import PropTypes from "prop-types"
import { MediaContextProvider } from "./Media"

export const Boot = ({ element }) => {
  return <MediaContextProvider>{element}</MediaContextProvider>
}

Boot.propTypes = {
  element: PropTypes.object.isRequired
}