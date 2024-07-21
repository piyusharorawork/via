import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import stylesheet from "./styles.css?url";
import "@via/ui/styles.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
