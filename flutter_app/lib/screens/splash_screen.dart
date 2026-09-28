import 'dart:async';

import 'package:flutter/material.dart';

import '../routes/fade_slide_route.dart';
import '../theme/app_colors.dart';
import 'home_screen.dart';

/// Animated splash: the OSSERVATORIO wordmark draws itself in
/// letter-by-letter (mirrors `FormaLogoAnimated`'s staggered `<tspan>`
/// fade-in on the website), then the tagline fades up, then three
/// pulsing dots. Tapping anywhere — or waiting ~2.4s — continues to
/// Home, same as the web mockup's full-bleed tap target.
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  Timer? _autoAdvance;

  static const _word = 'OSSERVATORIO';

  @override
  void initState() {
    super.initState();
    _autoAdvance = Timer(const Duration(milliseconds: 2400), _continue);
  }

  @override
  void dispose() {
    _autoAdvance?.cancel();
    super.dispose();
  }

  void _continue() {
    if (!mounted) return;
    _autoAdvance?.cancel();
    Navigator.of(context).pushReplacement(FadeSlideRoute(page: const HomeScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF10163B),
      body: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: _continue,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFF1B2462), Color(0xFF10163B), Color(0xFF0B1030)],
            ),
          ),
          child: Stack(
            children: [
              _DecorativeRing(top: -90, right: -90, size: 260, opacity: 0.10),
              _SpinningRing(top: -40, right: -40, size: 180, opacity: 0.14),
              _DecorativeRing(bottom: -120, left: -100, size: 280, opacity: 0.16, color: AppColors.accentOnDark),
              Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: List.generate(_word.length, (i) {
                        return _FadeLetter(
                          letter: _word[i],
                          delay: Duration(milliseconds: 150 + i * 60),
                        );
                      }),
                    ),
                    const SizedBox(height: 16),
                    _DelayedFade(
                      delay: const Duration(milliseconds: 1050),
                      child: const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 40),
                        child: Text(
                          "L'arte di osservare ciò che gli altri vedono soltanto.",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontFamily: 'Playfair Display',
                            fontStyle: FontStyle.italic,
                            fontWeight: FontWeight.w500,
                            fontSize: 14,
                            height: 1.5,
                            color: AppColors.accentOnDark,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Positioned(
                left: 0,
                right: 0,
                bottom: 64,
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(3, (i) => _PulsingDot(delay: Duration(milliseconds: i * 150))),
                    ),
                    const SizedBox(height: 14),
                    _DelayedFade(
                      delay: const Duration(milliseconds: 1300),
                      child: const Text(
                        'TOCCA PER CONTINUARE',
                        style: TextStyle(
                          fontSize: 11,
                          letterSpacing: 2,
                          color: Color(0x8CF9F3F2),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FadeLetter extends StatelessWidget {
  const _FadeLetter({required this.letter, required this.delay});

  final String letter;
  final Duration delay;

  @override
  Widget build(BuildContext context) {
    return _DelayedFade(
      delay: delay,
      slideFrom: const Offset(0, 0.3),
      child: Text(
        letter,
        style: const TextStyle(
          fontFamily: 'Playfair Display',
          fontWeight: FontWeight.w800,
          fontSize: 30,
          color: Color(0xFFF9F3F2),
        ),
      ),
    );
  }
}

/// Generic "appear after a delay" fade (+ optional slide), used for the
/// splash's staggered reveal — an implicit-animation building block, no
/// AnimationController needed.
class _DelayedFade extends StatefulWidget {
  const _DelayedFade({required this.child, required this.delay, this.slideFrom = const Offset(0, 0.15)});

  final Widget child;
  final Duration delay;
  final Offset slideFrom;

  @override
  State<_DelayedFade> createState() => _DelayedFadeState();
}

class _DelayedFadeState extends State<_DelayedFade> {
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
      duration: const Duration(milliseconds: 500),
      child: AnimatedSlide(
        offset: _visible ? Offset.zero : widget.slideFrom,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeOut,
        child: widget.child,
      ),
    );
  }
}

class _PulsingDot extends StatefulWidget {
  const _PulsingDot({required this.delay});

  final Duration delay;

  @override
  State<_PulsingDot> createState() => _PulsingDotState();
}

class _PulsingDotState extends State<_PulsingDot> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 1300));
    Future.delayed(widget.delay, () {
      if (mounted) _controller.repeat();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final t = _controller.value;
        // Mirrors the CSS keyframes: 0/80/100% dim, 40% bright.
        final pulse = t < 0.4 ? t / 0.4 : (t < 0.8 ? 1 - (t - 0.4) / 0.4 : 0.0);
        final scale = 0.8 + 0.2 * pulse;
        final opacity = 0.25 + 0.75 * pulse;
        return Opacity(
          opacity: opacity,
          child: Transform.scale(scale: scale, child: child),
        );
      },
      child: Container(
        width: 7,
        height: 7,
        margin: const EdgeInsets.symmetric(horizontal: 3),
        decoration: const BoxDecoration(color: AppColors.accentOnDark, shape: BoxShape.circle),
      ),
    );
  }
}

class _DecorativeRing extends StatelessWidget {
  const _DecorativeRing({this.top, this.bottom, this.left, this.right, required this.size, required this.opacity, this.color = const Color(0xFFF9F3F2)});

  final double? top;
  final double? bottom;
  final double? left;
  final double? right;
  final double size;
  final double opacity;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: color.withOpacity(opacity))),
      ),
    );
  }
}

class _SpinningRing extends StatefulWidget {
  const _SpinningRing({this.top, this.bottom, this.left, this.right, required this.size, required this.opacity});

  final double? top;
  final double? bottom;
  final double? left;
  final double? right;
  final double size;
  final double opacity;

  @override
  State<_SpinningRing> createState() => _SpinningRingState();
}

class _SpinningRingState extends State<_SpinningRing> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 44))..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: widget.top,
      bottom: widget.bottom,
      left: widget.left,
      right: widget.right,
      child: RotationTransition(
        turns: _controller,
        child: Container(
          width: widget.size,
          height: widget.size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: const Color(0xFFF9F3F2).withOpacity(widget.opacity)),
          ),
        ),
      ),
    );
  }
}
