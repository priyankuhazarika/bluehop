import globals from 'globals'

import { base } from './base.js'

/** Base config plus Node.js globals — for services, CLIs and scripts. */
export const node = [
  ...base,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]
