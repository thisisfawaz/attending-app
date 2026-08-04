import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/4ther.png" />
        <link rel="apple-touch-icon" href="/4ther.png" />
        
        {/* Primary Meta Tags */}
        <title>Banner Generator - Create Your Personalized Banner</title>
        <meta name="title" content="Banner Generator - Create Your Personalized Banner" />
        <meta name="description" content="Create personalized banners for events, conferences, and campaigns. Upload your photo, add your name, and generate a custom banner." />
        <meta name="keywords" content="banner generator, personalized banner, event banner, photo banner, RSVP banner" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://events.4ther.com/" />
        <meta property="og:title" content="Banner Generator - Create Your Personalized Banner" />
        <meta property="og:description" content="Create personalized banners for events, conferences, and campaigns. Upload your photo, add your name, and generate a custom banner." />
        <meta property="og:image" content="meet.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://events.4ther.com/" />
        <meta name="twitter:title" content="Banner Generator - Create Your Personalized Banner" />
        <meta name="twitter:description" content="Create personalized banners for events, conferences, and campaigns. Upload your photo, add your name, and generate a custom banner." />
        <meta name="twitter:image" content="meet.png" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#E2171D" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;