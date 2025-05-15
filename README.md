# React Icons Selector

<p align="center">
  <img src="./assets/icon.png" alt="React Icons Selector" width="800" />
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/react-icons-select" alt="npm version" />
  <img src="https://img.shields.io/bundlephobia/minzip/react-icons-select" alt="bundle size" />
  <img src="https://img.shields.io/npm/l/react-icons-select" alt="license" />
  <img src="https://img.shields.io/github/actions/workflow/status/waltercheng/react-icons-select/main.yml" alt="build status" />
  <img src="https://img.shields.io/npm/dm/react-icons-select" alt="downloads" />
</p>

A modern, lightweight React component for selecting icons from the popular [react-icons](https://react-icons.github.io/react-icons/) library.

## Motivation

Most existing icon selector libraries are either abandoned, broken with newer React versions, or missing support for the latest icon sets. After hitting too many walls trying to use them in modern projects, I thought "I'll do it myself" and created this library with support for:

- All 30+ icon packs from react-icons
- Modern React (17+) and TypeScript
- Lightweight with minimal dependencies
- Responsive design and accessibility

## Installation

```bash
# npm
npm install react-icons-select

# yarn
yarn add react-icons-select

# pnpm
pnpm add react-icons-select
```

Note: `react-icons` is a peer dependency and needs to be installed separately.

## Usage

### Basic Usage

```jsx
import React, { useState } from 'react';
import ReactIconsSelect from 'react-icons-select';
import { IconComponent } from 'react-icons-select';

function App() {
  const [selectedIcon, setSelectedIcon] = useState('');

  return (
    <div>
      <ReactIconsSelect
        value={selectedIcon}
        onChange={setSelectedIcon}
      />
      
      {selectedIcon && (
        <div>
          Selected Icon: <IconComponent iconName={selectedIcon} />
          {selectedIcon}
        </div>
      )}
    </div>
  );
}
```

### With Custom Options

```jsx
import React, { useState } from 'react';
import ReactIconsSelect from 'react-icons-select';

const MY_FAVORITE_ICONS = ["FaReact", "FaGithub", "MdDarkMode", "BiCodeBlock"];

function App() {
  const [selectedIcon, setSelectedIcon] = useState('');

  return (
    <div>
      <ReactIconsSelect
        value={selectedIcon}
        onChange={setSelectedIcon}
        iconOptions={MY_FAVORITE_ICONS}
        maxResults={20}
      />
    </div>
  );
}
```

## Custom Styling

You can customize the button appearance using the `buttonStyle` prop:

```jsx
import React, { useState } from 'react';
import ReactIconsSelect, { ButtonStyleProps } from 'react-icons-select';

function App() {
  const [selectedIcon, setSelectedIcon] = useState('');
  
  // Custom button styling
  const customStyle = {
    box: {
      backgroundColor: '#f0f9ff',
      border: '2px solid #0ea5e9',
      borderRadius: '8px',
      width: 100,
      height: 100,
    },
    icon: {
      marginBottom: '8px',
    },
    text: {
      color: '#0284c7',
      fontSize: '0.7rem',
      fontWeight: 'bold',
    }
  };
  
  return (
    <div>
      <ReactIconsSelect 
        value={selectedIcon} 
        onChange={setSelectedIcon}
        buttonStyle={customStyle}
      />
    </div>
  );
}
```

## Dark Mode

The component supports dark mode:

```jsx
import React, { useState } from 'react';
import ReactIconsSelect from 'react-icons-select';

function App() {
  const [selectedIcon, setSelectedIcon] = useState('');
  
  return (
    <div>
      <ReactIconsSelect 
        value={selectedIcon} 
        onChange={setSelectedIcon}
        darkMode={true}
      />
    </div>
  );
}
```

You can also let it automatically detect the system's dark mode preference by not providing the `darkMode` prop.

### Hide Library Selection

If you want to hide the library selection filter:

```jsx
import React, { useState } from 'react';
import ReactIconsSelect from 'react-icons-select';

function App() {
  const [selectedIcon, setSelectedIcon] = useState('');
  
  return (
    <div>
      <ReactIconsSelect 
        value={selectedIcon} 
        onChange={setSelectedIcon}
        showLibrarySelection={false}
      />
    </div>
  );
}
```

This will show a cleaner interface with just the search and icons grid.

### Custom Default Icons

You can specify your own set of default icons to display in the dialog:

```jsx
import React, { useState } from 'react';
import ReactIconsSelect from 'react-icons-select';

function App() {
  const [selectedIcon, setSelectedIcon] = useState('');
  
  // Custom default icons
  const myFavoriteIcons = [
    'FaReact', 
    'FaJs', 
    'FaHtml5', 
    'FaCss3', 
    'FaGithub', 
    'FaNode'
  ];
  
  return (
    <div>
      <ReactIconsSelect 
        value={selectedIcon} 
        onChange={setSelectedIcon}
        defaultIconOptions={myFavoriteIcons}
      />
    </div>
  );
}
```

This will display your preferred set of icons when the dialog first opens, instead of the library's default selection.

### Custom Results Limit

You can control the maximum number of search results displayed:

```jsx
import React, { useState } from 'react';
import ReactIconsSelect from 'react-icons-select';

function App() {
  const [selectedIcon, setSelectedIcon] = useState('');
  
  return (
    <div>
      <ReactIconsSelect 
        value={selectedIcon} 
        onChange={setSelectedIcon}
        maxResults={30} // Show more search results
      />
    </div>
  );
}
```

This is especially useful when working with larger icon libraries and you want to see more options in the search results.

## API Reference

### `ReactIconsSelect`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | undefined | Currently selected icon name |
| `onChange` | (value: string) => void | undefined | Function to call when an icon is selected |
| `text` | string | 'Select an Icon' | Text to display when no icon is selected |
| `onClick` | () => void | undefined | Additional click handler for the button |
| `darkMode` | boolean | auto-detect | Enable dark mode styling |
| `buttonStyle` | ButtonStyleProps | {} | Custom styling for the button |
| `showLibrarySelection` | boolean | true | Show or hide the library filter buttons in the dialog |
| `defaultIconOptions` | string[] | (12 common icons) | Default icons to show when no search is active |
| `maxResults` | number | 12 | Maximum number of results to show when searching |

### `ButtonStyleProps`

```typescript
interface ButtonStyleProps {
  box?: React.CSSProperties;  // Styles for the button container
  icon?: React.CSSProperties; // Styles for the icon container
  text?: React.CSSProperties; // Styles for the text
}
```

### `IconComponent`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconName` | string | required | Name of the icon to render (e.g. "FaReact") |
| `size` | number \| string | undefined | Size of the icon |
| `color` | string | undefined | Color of the icon |
| `style` | React.CSSProperties | undefined | Custom styles to apply |

## Supported Icon Libraries

All icon libraries from react-icons are supported, including:

- Fa: Font Awesome
- Fa6: Font Awesome 6
- Md: Material Design
- Ai: Ant Design Icons
- Io/Io5: Ionicons
- Ti: Typicons
- Go: Github Octicons
- Fi: Feather
- Lu: Lucide
- Gi: Game Icons
- Wi: Weather Icons
- Di: Devicons
- Bs: Bootstrap Icons
- Ri: Remix Icons
- And many more!

## License

MIT © Walter Cheng

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Disclaimer

This project was created with the assistance of AI tools for quicker development. Please understand that most of the content, including code and documentation, was AI-generated. If you're considering contributing to this project, it's important to be aware of this approach to development. While this method accelerates the initial creation process, your human expertise and refinement are valuable for maintaining and improving the quality of the codebase. 