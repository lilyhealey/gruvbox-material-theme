import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gulpUtil from 'gulp-util';
import * as mustache from 'mustache';
import * as path from 'path';

import {
  HR,
  MESSAGE_GENERATED,
  // MESSAGE_THEME_VARIANT_PARSE_ERROR
} from './../consts/log';

import {CHARSET} from './../../extensions/consts/files';
import {
  ColourVariant,
  // IThemeVariant,
  ThemeVariant
} from './../interfaces/itheme-variant';
import paths from './../../extensions/consts/paths';
import {
  ensureDir,
  // getDefaultValues
} from './../../extensions/helpers/fs';

// const commons = getDefaultValues();

// const template: string =
//   fs.readFileSync(
//     path.join(
//       paths.SRC,
//       '/themes/theme-template-color-theme.json'
//     ),
//     CHARSET
//   );

const template: string = fs.readFileSync(
  path.join(
    paths.SRC,
    '/themes/theme-template.json'
  ),
  CHARSET
);

const tokenTemplate: string = fs.readFileSync(
  path.join(
    paths.SRC,
    '/themes/token-template.json'
  ),
  CHARSET
);

const colourVariants: ColourVariant[] = [];
const themeVariants: ThemeVariant[] = [];

const colourFileNames: string[] =
  fs.readdirSync(
    path.join(
      paths.SRC,
      './themes/colours'
    )
  );

const themeFileNames: string[] =
  fs.readdirSync(
    path.join(
      paths.SRC,
      './themes/schemes'
    )
  );

// build theme variants for later use in templating
colourFileNames.forEach(fileName => {
  const filePath: string =
    path.join(
      paths.SRC,
      './themes/colours',
      `./${fileName}`
    );

  const contents: string =
    fs.readFileSync(
      filePath,
      CHARSET
    );

  try {
    // themeVariants.push(JSON.parse(contents));
    colourVariants.push(JSON.parse(contents));
  } catch (error) {
    gulpUtil.log('Error parsing colour variants.', error);
  }
});

colourVariants.forEach(variant => {
  themeFileNames.forEach(fileName => {
    const filePath: string =
      path.join(
        paths.SRC,
        './themes/schemes',
        `./${fileName}`
      );

    const schemeTemplate: string =
      fs.readFileSync(
        filePath,
        CHARSET
      );

    try {
      // themeVariants.push(JSON.parse(contents));
      const templateJSON: any = JSON.parse(
        mustache.render(schemeTemplate, {variant})
      );
      const tokenTemplateJSON: any = JSON.parse(
        mustache.render(tokenTemplate, {variant})
      );
      templateJSON.tokenColors = tokenTemplateJSON.tokenColours;
      themeVariants.push(templateJSON);
    } catch (error) {
      gulpUtil.log('Error parsing theme variants.', error);
    }
  });
});

/**
 * Themes task
 * Builds Themes
 */
export default gulp.task('build:themes', cb => {
  gulpUtil.log(gulpUtil.colors.gray(HR));

  ensureDir(path.join(paths.THEMES));

  try {
    themeVariants.forEach(variant => {
      const filePath = path.join(paths.THEMES, `./${variant.name}.json`);
      // const templateData = {commons, variant};
      const templateData = {variant};
      const tokenColors = variant.tokenColors;
      const templateJSON: any = JSON.parse(mustache.render(template, templateData));
      templateJSON.tokenColors = tokenColors;
      const templateJSONStringified: string = JSON.stringify(templateJSON, null, 2);

      fs.writeFileSync(filePath, templateJSONStringified, {encoding: CHARSET});

      gulpUtil.log(MESSAGE_GENERATED, gulpUtil.colors.blue(filePath));
    });
  } catch (exception) {
    gulpUtil.log(exception);
    cb(exception);
  }

  gulpUtil.log(gulpUtil.colors.gray(HR));
});
