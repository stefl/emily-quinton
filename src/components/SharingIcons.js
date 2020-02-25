import { FaTwitter, FaInstagram, FaFacebook, FaPinterest, FaYoutube } from "react-icons/fa"

import React from 'react'

function SharingIcons() {
  return <div className="text-center pt-8">
    <div className="inline-block"><a className="p-2 inline-block" href="https://instagram.com/emilyquinton"><FaInstagram /></a></div> 
    <div className="inline-block"><a className="p-2 inline-block" href="https://twitter.com/emilyquinton"><FaTwitter /></a></div>
    <div className="inline-block"><a className="p-2 inline-block" href="https://youtube.com/emilyquinton"><FaYoutube /></a></div>  
    <div className="inline-block"><a className="p-2 inline-block" href="https://facebook.com/emilyquinton"><FaFacebook /></a></div> 
    <div className="inline-block"><a className="p-2 inline-block" href="https://pinterest.com/emilyquinton"><FaPinterest /></a></div>
  </div>
}

export default SharingIcons