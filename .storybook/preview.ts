import { withThemeByDataAttribute } from "@storybook/addon-themes"
import type { Preview, SvelteRenderer } from '@storybook/sveltekit'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute<SvelteRenderer>({
      /* TODO: Add color themes. */
      themes: {},
      defaultTheme: "doomscrll",
      attributeName: "data-theme",
    })
  ]
};

export default preview;