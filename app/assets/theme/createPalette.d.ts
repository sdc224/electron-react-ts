import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface TypeText {
    link?: string;
  }

  interface PaletteOptions {
    black?: createPalette.PaletteColorOptions;
    white?: createPalette.PaletteColorOptions;
    icon?: createPalette.PaletteColorOptions;
  }

  interface Palette {
    black: string;
    white: string;
    icon: string;
  }
}
