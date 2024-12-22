import React from 'react';
import { Helmet } from 'react-helmet';

const MyMetaTags = () => (
  <Helmet>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    {/* SEO */}
    <title>Mansory Roleplay</title>
    <meta name="description" content="Головна сторінка проекту Mansory Roleplay." />
    <meta name="keywords" content="Mansory roleplay, gta 5 rp, gta 5, altv" />
    <meta name="author" content="Mansory" />

    {/* Соціальні мережі */}
    <meta property="og:title" content="Mansory Roleplay" />
    <meta property="og:description" content="Головна сторінка проекту Mansory Roleplay." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://mansory-rp.com" />
    <meta property="og:image" content="https://mansory-rp.com/preview.jpg" />
    <meta property="og:locale" content="uk_UA" />

  </Helmet>
);

export default MyMetaTags;
