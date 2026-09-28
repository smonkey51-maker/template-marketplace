import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'app_colors.dart';

/// Fraunces on the web became Playfair Display for the "Il Taccuino di
/// Jane" redesign; Inter stayed the body/UI face. Same pairing here.
class AppTheme {
  AppTheme._();

  static TextTheme _textTheme(Color ink) {
    final display = GoogleFonts.playfairDisplayTextTheme();
    final body = GoogleFonts.interTextTheme();
    return body
        .copyWith(
          headlineLarge: display.headlineLarge?.copyWith(fontWeight: FontWeight.w700, color: ink),
          headlineMedium: display.headlineMedium?.copyWith(fontWeight: FontWeight.w700, color: ink),
          headlineSmall: display.headlineSmall?.copyWith(fontWeight: FontWeight.w700, color: ink),
          titleLarge: display.titleLarge?.copyWith(fontWeight: FontWeight.w700, color: ink),
          titleMedium: display.titleMedium?.copyWith(fontWeight: FontWeight.w600, color: ink),
        )
        .apply(bodyColor: ink, displayColor: ink);
  }

  static ThemeData light() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: AppColors.bg,
      fontFamily: GoogleFonts.inter().fontFamily,
      textTheme: _textTheme(AppColors.ink),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.bg,
        foregroundColor: AppColors.ink,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: AppColors.surface,
        indicatorColor: AppColors.surface2,
        surfaceTintColor: Colors.transparent,
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return TextStyle(
            fontSize: 11,
            fontWeight: selected ? FontWeight.w700 : FontWeight.w600,
            color: selected ? AppColors.accent : AppColors.muted,
          );
        }),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return IconThemeData(color: selected ? AppColors.accent : AppColors.muted);
        }),
      ),
      colorScheme: ColorScheme.light(
        primary: AppColors.accent,
        onPrimary: AppColors.bg,
        secondary: AppColors.ink,
        surface: AppColors.surface,
        onSurface: AppColors.ink,
        error: AppColors.accentDark,
      ),
    );
  }

  static ThemeData dark() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.bgDark,
      fontFamily: GoogleFonts.inter().fontFamily,
      textTheme: _textTheme(AppColors.inkDark),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.bgDark,
        foregroundColor: AppColors.inkDark,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: AppColors.surfaceDark,
        indicatorColor: AppColors.surface2Dark,
        surfaceTintColor: Colors.transparent,
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return TextStyle(
            fontSize: 11,
            fontWeight: selected ? FontWeight.w700 : FontWeight.w600,
            color: selected ? AppColors.accentOnDark : AppColors.mutedDark,
          );
        }),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return IconThemeData(color: selected ? AppColors.accentOnDark : AppColors.mutedDark);
        }),
      ),
      colorScheme: ColorScheme.dark(
        primary: AppColors.accentOnDark,
        onPrimary: AppColors.bgDark,
        secondary: AppColors.inkDark,
        surface: AppColors.surfaceDark,
        onSurface: AppColors.inkDark,
        error: AppColors.accentOnDark,
      ),
    );
  }
}
