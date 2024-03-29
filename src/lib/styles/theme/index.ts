import { extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';

import { config } from './config';

export const theme = extendTheme({
  fonts: {
    heading: 'Plus Jakarta Sans, sans-serif',
    body: 'Plus Jakarta Sans, sans-serif',
  },
  components: {
    // Button: {
    // }
  },
  config,
}, withProse(
  {
    baseStyle: {
      iframe: {
        maxWidth: '100%',
      },
      a: {
        color: 'blue.700',
        fontWeight: 'bold'
      },
      strong: {
        fontWeight: 'bold',
      },
    },
  }
));
