import { Helmet } from 'react-helmet';

const APP_NAME = 'PowerScraper';

const Meta = () => {
  return (
    <Helmet>
      <title>PowerScraper</title>
      <meta name="description" content="PowerScraper" />

      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />

      <link rel="shortcut icon" href="/assets/favicon.svg" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Helmet>
  );
};

export default Meta;
