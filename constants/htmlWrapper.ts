import { Theme, ThemeKey, themeToCssVars } from "./themes";

export const HtmlWrapper = (theme: Theme, code: string) => {
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  
    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
  
    <!-- Iconify -->
    <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>
  
    <style>
      ${themeToCssVars(theme)}
    </style>
  </head>
  
  <body class="bg-background text-foreground w-full">
    ${code ?? ""}
  </body>
  </html>
  `;
}