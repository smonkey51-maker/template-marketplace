import 'package:flutter/material.dart';

/// Custom page transition (fade + a short upward slide) used for every
/// navigation in the app instead of the platform-default transition —
/// this is the "animazioni" the mockup asked for applied to navigation.
class FadeSlideRoute<T> extends PageRouteBuilder<T> {
  FadeSlideRoute({required this.page})
    : super(
        transitionDuration: const Duration(milliseconds: 380),
        reverseTransitionDuration: const Duration(milliseconds: 280),
        pageBuilder: (context, animation, secondaryAnimation) => page,
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          final curved = CurvedAnimation(parent: animation, curve: Curves.easeOutCubic);
          return FadeTransition(
            opacity: curved,
            child: SlideTransition(
              position: Tween<Offset>(
                begin: const Offset(0, 0.04),
                end: Offset.zero,
              ).animate(curved),
              child: child,
            ),
          );
        },
      );

  final Widget page;
}
