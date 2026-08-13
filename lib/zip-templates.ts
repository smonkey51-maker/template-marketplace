import { zipSync, strToU8 } from "fflate";
import type { Template } from "./templates";

/**
 * Generates a Shopify Liquid theme section .zip from template HTML content.
 * Returns a Buffer-like Uint8Array ready to be sent as a response.
 */
export function buildShopifyZip(template: Template, displayName: string): Uint8Array {
  const sectionSlug = template.id;

  // Convert Tailwind HTML to a Liquid section with schema
  const liquidSection = `{% comment %}
  ${displayName} — FORMA
  Shopify Liquid Section
  Drop this file into sections/ in your theme.
{% endcomment %}

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3/dist/tailwind.min.css">

${template.content}

{% schema %}
{
  "name": "${displayName}",
  "tag": "section",
  "class": "forma-section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "${displayName}"
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Accent color",
      "default": "#10b981"
    }
  ],
  "presets": [
    {
      "name": "${displayName}"
    }
  ]
}
{% endschema %}
`;

  const readmeMd = `# ${displayName}

> Shopify Liquid section by FORMA

## Installation

1. In your Shopify admin, go to **Online Store → Themes → Edit code**
2. Under **Sections**, click **Add a new section**
3. Name it \`${sectionSlug}\`
4. Paste the contents of \`sections/${sectionSlug}.liquid\`
5. Save, then add the section to any page via the Theme Editor

## Customization

Use the Theme Editor to modify settings (heading text, accent color).
For deeper changes, edit the Liquid/HTML directly or use FORMA AI Studio.

---

Made with FORMA · template-marketplace-psi.vercel.app
`;

  const files: Record<string, Uint8Array> = {
    [`${sectionSlug}/sections/${sectionSlug}.liquid`]: strToU8(liquidSection),
    [`${sectionSlug}/README.md`]: strToU8(readmeMd),
  };

  return zipSync(files, { level: 6 });
}

/**
 * Generates a WordPress PHP theme .zip from template HTML content.
 * Returns a Uint8Array ready to be sent as a response.
 */
export function buildWordPressZip(template: Template, displayName: string): Uint8Array {
  const themeSlug = template.id;
  const themeName = displayName;

  const styleCss = `/*
Theme Name: ${themeName}
Theme URI: https://template-marketplace-psi.vercel.app
Author: FORMA
Author URI: https://template-marketplace-psi.vercel.app
Description: ${template.description}
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: ${themeSlug}
*/
`;

  const functionsPhp = `<?php
/**
 * ${themeName} — functions and definitions
 *
 * @package ${themeName}
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function ${themeSlug.replace(/-/g, "_")}_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    add_theme_support( 'custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', '${themeSlug}' ),
        'footer'  => __( 'Footer Menu', '${themeSlug}' ),
    ) );
}
add_action( 'after_setup_theme', '${themeSlug.replace(/-/g, "_")}_setup' );

function ${themeSlug.replace(/-/g, "_")}_scripts() {
    wp_enqueue_style( '${themeSlug}-style', get_stylesheet_uri(), array(), '1.0.0' );
    wp_enqueue_script( 'tailwindcss', 'https://cdn.tailwindcss.com', array(), null, true );
}
add_action( 'wp_enqueue_scripts', '${themeSlug.replace(/-/g, "_")}_scripts' );
`;

  const headerPhp = `<?php
/**
 * Header template
 *
 * @package ${themeName}
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
`;

  const footerPhp = `<?php
/**
 * Footer template
 *
 * @package ${themeName}
 */
?>
<?php wp_footer(); ?>
</body>
</html>
`;

  const indexPhp = `<?php
/**
 * Main template file
 *
 * @package ${themeName}
 */

get_header(); ?>

${template.content}

<?php get_footer(); ?>
`;

  const frontPagePhp = `<?php
/**
 * Front page template
 *
 * @package ${themeName}
 */

get_header(); ?>

${template.content}

<?php get_footer(); ?>
`;

  const readmeMd = `# ${themeName}

> WordPress theme by FORMA

## Installation

1. Download and unzip this file
2. Upload the \`${themeSlug}/\` folder to \`wp-content/themes/\`
3. In WordPress admin, go to **Appearance → Themes**
4. Activate **${themeName}**

## Customization

- Edit template files directly, or
- Use FORMA AI Studio for AI-powered customization

## Files included

- \`style.css\` — Theme metadata + custom styles
- \`functions.php\` — Theme setup, menus, enqueues
- \`header.php\` — HTML head + opening body
- \`footer.php\` — Closing body + wp_footer
- \`index.php\` — Main template
- \`front-page.php\` — Homepage template

---

Made with FORMA · template-marketplace-psi.vercel.app
`;

  const files: Record<string, Uint8Array> = {
    [`${themeSlug}/style.css`]: strToU8(styleCss),
    [`${themeSlug}/functions.php`]: strToU8(functionsPhp),
    [`${themeSlug}/header.php`]: strToU8(headerPhp),
    [`${themeSlug}/footer.php`]: strToU8(footerPhp),
    [`${themeSlug}/index.php`]: strToU8(indexPhp),
    [`${themeSlug}/front-page.php`]: strToU8(frontPagePhp),
    [`${themeSlug}/README.md`]: strToU8(readmeMd),
  };

  return zipSync(files, { level: 6 });
}
