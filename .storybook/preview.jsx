import '../src/index.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    colorScheme: {
      description: 'Color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Color scheme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const scheme = context.globals.colorScheme ?? 'light';
      document.documentElement.classList.toggle('dark', scheme === 'dark');
      // Let the design system token drive the background colour
      document.documentElement.style.background = '';
      return (
        <div className="bg-bg-page text-fg-primary min-h-screen p-8 font-sans">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    // Remove Storybook's built-in background switcher — our toolbar toggle handles it
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;