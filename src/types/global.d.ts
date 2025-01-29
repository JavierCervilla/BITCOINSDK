import type { ReactElement, ReactNode } from 'react'

declare global {
  namespace JSX {
    interface Element extends ReactElement {}
    interface IntrinsicElements {
      div: any;
      span: any;
      button: any;
      p: any;
      img: any;
      ul: any;
      li: any;
      // Añade aquí cualquier otro elemento HTML que necesites
    }
  }
}

export {} 