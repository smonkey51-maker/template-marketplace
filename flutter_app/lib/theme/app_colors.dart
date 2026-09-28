import 'package:flutter/material.dart';

/// The exact "Ultramarine & Dusty Rose" palette from the Osservatorio
/// website (see the web repo's CLAUDE.md — "Design System"). Kept as a
/// flat set of constants rather than threaded through a [ColorScheme] /
/// [ThemeData] so every screen matches the site's tokens 1:1, the same
/// way the web CSS custom properties work: `--text`, `--accent`,
/// `--surface-2`, etc.
class AppColors {
  AppColors._();

  // Light mode.
  static const Color bg = Color(0xFFF9F3F2);
  static const Color surface = Color(0xFFFCF9F8);
  static const Color surface2 = Color(0xFFE4E0E8);
  static const Color ink = Color(0xFF26348C); // "--text" — Ultramarine
  static const Color muted = Color(0xFF5B64A6);
  static const Color accent = Color(0xFF8A625E); // darkened Dusty Rose
  static const Color accentDark = Color(0xFF614542);
  static const Color border = Color(0x2326348C); // ink at 14%

  // Dark mode.
  static const Color bgDark = Color(0xFF10163B);
  static const Color surfaceDark = Color(0xFF151D4D);
  static const Color surface2Dark = Color(0xFF1B2462);
  static const Color inkDark = Color(0xFFF9F3F2); // "--text" on dark ground
  static const Color mutedDark = Color(0xFF9090A0);
  static const Color accentOnDark = Color(0xFFCEA29E); // lightened Dusty Rose
  static const Color borderDark = Color(0x23F9F3F2);
}

/// Bundles the palette a screen should read from, so widgets take one
/// `AppPalette` instead of branching on `Theme.of(context).brightness`
/// everywhere. Built once per screen from [AppPalette.of].
class AppPalette {
  const AppPalette({
    required this.bg,
    required this.surface,
    required this.surface2,
    required this.ink,
    required this.muted,
    required this.accent,
    required this.border,
    required this.isDark,
  });

  final Color bg;
  final Color surface;
  final Color surface2;
  final Color ink;
  final Color muted;
  final Color accent;
  final Color border;
  final bool isDark;

  static AppPalette of(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return isDark
        ? const AppPalette(
            bg: AppColors.bgDark,
            surface: AppColors.surfaceDark,
            surface2: AppColors.surface2Dark,
            ink: AppColors.inkDark,
            muted: AppColors.mutedDark,
            accent: AppColors.accentOnDark,
            border: AppColors.borderDark,
            isDark: true,
          )
        : const AppPalette(
            bg: AppColors.bg,
            surface: AppColors.surface,
            surface2: AppColors.surface2,
            ink: AppColors.ink,
            muted: AppColors.muted,
            accent: AppColors.accent,
            border: AppColors.border,
            isDark: false,
          );
  }
}
