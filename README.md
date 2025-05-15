# React Icons Selector

<p align="center">
  <img src="./assets/banner.svg" alt="React Icons Selector" width="800" />
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/react-icons-selector" alt="npm version" />
  <img src="https://img.shields.io/bundlephobia/minzip/react-icons-selector" alt="bundle size" />
  <img src="https://img.shields.io/npm/l/react-icons-selector" alt="license" />
  <img src="https://img.shields.io/github/actions/workflow/status/waltercheng/react-icons-selector/main.yml" alt="build status" />
  <img src="https://img.shields.io/npm/dm/react-icons-selector" alt="downloads" />
</p>

A modern, lightweight React component for selecting icons from the popular [react-icons](https://react-icons.github.io/react-icons/) library.

## Motivation

While there are other icon selector libraries available, many have become outdated or lack support for the latest React versions and icon sets. This library was created to provide a modern, actively maintained alternative with support for:

- All 30+ icon packs from react-icons
- Modern React (17+) and TypeScript
- Lightweight with minimal dependencies
- Responsive design and accessibility

## Features

- 🔍 Search through entire icon library or filter by specific pack
- 🎨 Consistent icon sizing and styling
- 📱 Responsive design for all screen sizes
- 📦 Lightweight with minimal dependencies
- 🌐 Support for all react-icons libraries (30+ icon packs)
- 🎛️ Customizable result limits and default options
- 🎯 TypeScript support with full type definitions

## Installation

```bash
# npm
npm install react-icons-selector react-icons

# yarn
yarn add react-icons-selector react-icons

# pnpm
pnpm add react-icons-selector react-icons
```

Note: `react-icons` is a peer dependency and needs to be installed separately.

## Usage

### Basic Usage

```jsx
import React, { useState } from 'react';
import { IconSelectorDialog } from 'react-icons-selector';
import { IconComponent } from 'react-icons-selector';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Select Icon
      </button>
      
      {selectedIcon && (
        <div>
          Selected Icon: <IconComponent iconName={selectedIcon} />
          {selectedIcon}
        </div>
      )}
      
      <IconSelectorDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={selectedIcon}
        onChange={setSelectedIcon}
      />
    </div>
  );
}
```

### With Custom Options

```jsx
import React, { useState } from 'react';
import { IconSelectorDialog } from 'react-icons-selector';
import { IconComponent } from 'react-icons-selector';

const MY_FAVORITE_ICONS = ["FaReact", "FaGithub", "MdDarkMode", "BiCodeBlock"];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Select Icon
      </button>
      
      <IconSelectorDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={selectedIcon}
        onChange={setSelectedIcon}
        iconOptions={MY_FAVORITE_ICONS}
        maxResults={20}
      />
    </div>
  );
}
```

## API Reference

### `IconSelectorDialog`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | required | Controls the visibility of the dialog |
| `onClose` | () => void | required | Function to call when the dialog is closed |
| `value` | string | undefined | Currently selected icon name |
| `onChange` | (value: string) => void | undefined | Function to call when an icon is selected |
| `iconOptions` | string[] | undefined | Custom list of icon names to display |
| `maxResults` | number | 12 | Maximum number of results to show when searching |
| `defaultIconOptions` | string[] | (12 common icons) | Default icons to show when no search is active |

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