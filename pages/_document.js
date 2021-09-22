import React from "react";
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from "@material-ui/styles";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    // const originalRenderPage = ctx.renderPage;
    // ctx.renderPage = () =>
    //   originalRenderPage({
    //     enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    //   });
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom!*/`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}