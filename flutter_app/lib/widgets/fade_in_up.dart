import 'package:flutter/material.dart';

/// Staggered entrance animation used across Home and L'Archivio — the
/// app equivalent of the web site's `.stagger` / `@keyframes fadeUp`
/// CSS class in `globals.css`. Implicit (no AnimationController): the
/// widget waits [delay], then animates opacity + a small upward slide.
class FadeInUp extends StatefulWidget {
  const FadeInUp({
    super.key,
    required this.child,
    this.delay = Duration.zero,
    this.duration = const Duration(milliseconds: 420),
  });

  final Widget child;
  final Duration delay;
  final Duration duration;

  @override
  State<FadeInUp> createState() => _FadeInUpState();
}

class _FadeInUpState extends State<FadeInUp> {
  bool _visible = false;

  @override
  void initState() {
    super.initState();
    Future.delayed(widget.delay, () {
      if (mounted) setState(() => _visible = true);
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedOpacity(
      opacity: _visible ? 1 : 0,
      duration: widget.duration,
      curve: Curves.easeOut,
      child: AnimatedSlide(
        offset: _visible ? Offset.zero : const Offset(0, 0.06),
        duration: widget.duration,
        curve: Curves.easeOut,
        child: widget.child,
      ),
    );
  }
}
