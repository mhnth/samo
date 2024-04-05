## Setup

postcss Setup:

postcss.config.js

```
module.exports = {
  plugins: {
    'postcss-import': {}, // postcss-import needs to be first
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

import css

```
@import 'tailwindcss/base';

@import 'tailwindcss/components';
@import './../styles/form.css';

@import 'tailwindcss/utilities';
```
