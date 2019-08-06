# Mole

Mole allows you to translate abstract design decisions and output them into consumable files for any platform.

It's main principles are:

- Freedom to describe your design descions how you like
- Choose your own data model for ouputting design tokens
- Simple and flexible, automatic loading of templates, optional named outputs

## Install

Install to your npm project

```bash
mkdir my-project
cd my-project
npm install https://github.com/limitlessloop/mole.git --save-dev
```

Require using 

```js
const mole = require('mole')
```

## Configure

Configure where Mole should look for your theme data, what templates to use, what data model to use and where to output your files by modifying `mole.config.js`.

Below if a simple example that supports just one output

```js
export default {
    theme: 'theme/',
    template: ['border', 'color', 'width', 'flex'],
    output: { file: 'styles.css' }
}

```

Below is a more complex example with named outputs and a custom data model
```js
export default {
    theme: 'theme/',
    model: ['chars', 'tokens'],
    template: 'templates/',
    output: [
        { css: { file: 'styles.css' } },
        { ios: { file: 'styles.h' } },
        { android: { file: 'styles.xml' } }
    ]
}
```

## Theme

Below is trival example of theme data being defined. It can be  accessed within `models` and `templates` by referencig the corresponding property name. For example `font.size[2]` will return `22`.

```js
{
    font: {
        size: [
            16,
            19,
            22,
            26,
            30,
            35
        ]
    }
}
```

Or generate the same array using a more expressive technique using functions from the `jsonnet` standard library.

```js
{
    font: {
        size: [
            std.ceil(16 * std.pow($.number['golden ratio'], n))
            for n in std.range(0, 5)
        ]
    }
}
```

## Plugins

Plugins allow you to change the data model and create new templates

An example below setting a plugin to add a color to data model

```js
mole.setPlugin(
    new Plugin('modelTest', function(model) {
        model.color.red = 'FF0000'
    })
)
```

An example below to create template to read the color we just added

```js
mole.setPlugin(
  new Plugin('templateTest', function() {
    return "I'm {{color.red}}"
  })
)
```


## How does it work?

Mole works by reading theme data written in any `json` like format which describes certain design traits or characteristics. One or more `models` then transform the data so it can be used by `templates` for different platforms and languages. The output is written to a file or set of files depending on your configuration.



## Development

To setup

```bash
npm install
```

To run/compile

```bash
npm run build
```

To test

```
npm run test
```

To test and watch for changes

```
npm run dev
```

