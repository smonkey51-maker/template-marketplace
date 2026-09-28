# Osservatorio — Flutter companion app

Companion Android app for the Osservatorio site, matching the approved
Flutter mockup: Splash, Home, L'Archivio (with live category filtering)
and Article Detail, all built with the site's exact "Ultramarine & Dusty
Rose" palette and Playfair Display / Inter type pairing.

Unofficial fan project about "The Mentalist" — not affiliated with CBS
or Warner Bros. Article content here is original commentary, kept
consistent with the disclaimer rules in the main repo's `CLAUDE.md`.

## Status

This code was written without a local Flutter SDK available (the
sandbox that produced it has no `flutter`/`dart` binaries), so it has
**not been compiled or run**. It's written conservatively against the
`>=3.3.0` SDK floor declared in `pubspec.yaml`, avoiding newer/unstable
APIs, but treat it as a first pass to verify locally before relying on
it.

## Running it

```bash
cd flutter_app
flutter pub get
flutter run
```

## Structure

- `lib/theme/` — palette (`app_colors.dart`) and `ThemeData` (`app_theme.dart`), ported 1:1 from the website's CSS custom properties.
- `lib/models/`, `lib/data/` — `Article` model and a sample dataset (condensed from the real site content).
- `lib/widgets/` — shared building blocks: fade/slide entrance (`fade_in_up.dart`), tap feedback (`tap_scale.dart`), callout box, bottom nav, article cards.
- `lib/routes/fade_slide_route.dart` — the fade+slide page transition used for all navigation.
- `lib/screens/` — Splash, Home, Archivio, ArticleDetail.
