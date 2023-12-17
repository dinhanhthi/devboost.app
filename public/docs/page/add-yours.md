The site isn't good enough and it needs your help to improve it.

## Setting up

```bash
# Clone the project to you computer,
# change the name from "devboost.app" to "devboost-app" to make sure that will
# be a folder instead of an ".app" file.
git clone https://github.com/dinhanhthi/devboost.app.git devboost-app

# Install
yarn
```

Working,

```bash
yarn dev
yarn dev --turbo # turbo mode
yarn build # build locally
yarn prettier # prettier your codes
yarn clean # clean .next
```

## Write tests

### Tests for tools

Place the test files in the folder `__tests__` of each tool. The name of each test file is the same as the name of the tool. For example, the test for `src/tools/base64/Base64String.tsx` should be placed in `src/tools/base64/__tests__/Base64String.test.tsx`.

## How to add more tools?

1. Choose a logo for that tool, in `svg` format. I recommend to use [this site](https://icones.js.org/collection/all). Copy the svg codes and create a new file in `src/icons/`. Make sure you follow the same structure like the others. If you use the site I recommend, just click an icon and then click "React TS" under "Components" to copy the svg codes and paste it in the file you just created.
2. Create a component in `src/tools/<group>/NameOfTool.tsx`. Just take a look at one of existing tool and make a copy.
3. Add the information of the tool in `src/tools/toolList.tsx`.
4. For our styles, we leverage [shadcn/ui](https://ui.shadcn.com) and [Radix UI](https://radix-ui.com). Our custom color scheme is located in `src/styles/globals.scss`. It's important to note that these custom colors aren't part of [the default sets](https://ui.shadcn.com/themes) provided by shadcn/ui. If you encounter any inconsistencies in styles, please don't hesitate to [initiate a discussion](https://github.com/dinhanhthi/devboost.app/issues) on GitHub.
5. (Optional) Writing tests.