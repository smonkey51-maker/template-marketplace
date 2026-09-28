import 'package:flutter/material.dart';

import '../models/article.dart';
import '../theme/app_colors.dart';
import '../widgets/callout_box.dart';
import '../widgets/fade_in_up.dart';
import '../widgets/tap_scale.dart';

/// Article detail — hero header, animated reading-progress bar (grows
/// on mount, mirroring the mockup's `progressGrow` CSS keyframe), body
/// paragraphs, optional callout, tags, and a bottom action bar.
class ArticleDetailScreen extends StatelessWidget {
  const ArticleDetailScreen({super.key, required this.article});

  final Article article;

  @override
  Widget build(BuildContext context) {
    final palette = AppPalette.of(context);

    return Scaffold(
      backgroundColor: palette.bg,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 220,
            pinned: true,
            backgroundColor: palette.surface,
            leading: Padding(
              padding: const EdgeInsets.all(8),
              child: TapScale(
                onTap: () => Navigator.of(context).pop(),
                child: CircleAvatar(
                  backgroundColor: Colors.black26,
                  child: const Icon(Icons.arrow_back, color: Colors.white, size: 18),
                ),
              ),
            ),
            actions: [
              Padding(
                padding: const EdgeInsets.all(8),
                child: TapScale(
                  onTap: () {},
                  child: CircleAvatar(
                    backgroundColor: Colors.black26,
                    child: const Icon(Icons.bookmark_border, color: Colors.white, size: 18),
                  ),
                ),
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: article.gradient,
                      ),
                    ),
                  ),
                  DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.transparent, Colors.black.withOpacity(0.55)],
                      ),
                    ),
                  ),
                  Positioned(
                    left: 18,
                    right: 18,
                    bottom: 16,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          article.category.label.toUpperCase(),
                          style: const TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1.2),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          article.title,
                          style: const TextStyle(
                            fontFamily: 'Playfair Display',
                            fontWeight: FontWeight.w700,
                            fontSize: 21,
                            height: 1.2,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _ProgressBar(color: palette.accent, track: palette.border),
                Padding(
                  padding: const EdgeInsets.fromLTRB(18, 16, 18, 100),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      FadeInUp(
                        child: Row(
                          children: [
                            Icon(Icons.schedule, size: 14, color: palette.muted),
                            const SizedBox(width: 5),
                            Text('${article.readMinutes} min di lettura', style: TextStyle(fontSize: 12, color: palette.muted)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 18),
                      for (var i = 0; i < article.paragraphs.length; i++) ...[
                        FadeInUp(
                          delay: Duration(milliseconds: 60 + i * 70),
                          child: Text(
                            article.paragraphs[i],
                            style: TextStyle(fontSize: 14.5, height: 1.7, color: palette.ink),
                          ),
                        ),
                        const SizedBox(height: 16),
                      ],
                      if (article.callout != null) ...[
                        FadeInUp(
                          delay: Duration(milliseconds: 80 + article.paragraphs.length * 70),
                          child: CalloutBox(title: article.callout!.title, body: article.callout!.body),
                        ),
                        const SizedBox(height: 20),
                      ],
                      FadeInUp(
                        delay: Duration(milliseconds: 140 + article.paragraphs.length * 70),
                        child: Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: [
                            for (final tag in article.tags)
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 6),
                                decoration: BoxDecoration(
                                  color: palette.surface2,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text('#$tag', style: TextStyle(fontSize: 11, color: palette.muted)),
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(18, 10, 18, 10),
          child: Row(
            children: [
              Expanded(
                child: TapScale(
                  onTap: () {},
                  child: Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.symmetric(vertical: 13),
                    decoration: BoxDecoration(color: palette.accent, borderRadius: BorderRadius.circular(10)),
                    child: Text('Salva', style: TextStyle(color: palette.bg, fontSize: 13, fontWeight: FontWeight.w700)),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: TapScale(
                  onTap: () {},
                  child: Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.symmetric(vertical: 13),
                    decoration: BoxDecoration(borderRadius: BorderRadius.circular(10), border: Border.all(color: palette.border)),
                    child: Text('Condividi', style: TextStyle(color: palette.ink, fontSize: 13, fontWeight: FontWeight.w600)),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Animated reading-progress bar — grows from 0 to a fixed value on
/// mount, mirroring the mockup's `progressGrow` CSS keyframe (this is a
/// static preview fill, not scroll-tracked, matching the mockup).
class _ProgressBar extends StatelessWidget {
  const _ProgressBar({required this.color, required this.track});

  final Color color;
  final Color track;

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0, end: 0.72),
      duration: const Duration(milliseconds: 900),
      curve: Curves.easeOutCubic,
      builder: (context, value, _) {
        return SizedBox(
          height: 3,
          child: LayoutBuilder(
            builder: (context, constraints) {
              return Stack(
                children: [
                  Container(color: track),
                  Container(width: constraints.maxWidth * value, color: color),
                ],
              );
            },
          ),
        );
      },
    );
  }
}
