import 'package:flutter/material.dart';

import '../data/articles_data.dart';
import '../models/article.dart';
import '../routes/fade_slide_route.dart';
import '../theme/app_colors.dart';
import '../widgets/app_bottom_nav.dart';
import '../widgets/article_card.dart';
import '../widgets/fade_in_up.dart';
import '../widgets/tap_scale.dart';
import 'article_detail_screen.dart';

/// L'Archivio — the four-category filter + article list screen (mirrors
/// `Archivio.dc.html` in the approved mockup: real `setState`-driven chip
/// selection, filtered list, staggered entrance).
class ArchivioScreen extends StatefulWidget {
  const ArchivioScreen({super.key});

  @override
  State<ArchivioScreen> createState() => _ArchivioScreenState();
}

class _ArchivioScreenState extends State<ArchivioScreen> {
  ArticleCategory? _selected;

  void _openArticle(Article article) {
    Navigator.of(context).push(FadeSlideRoute(page: ArticleDetailScreen(article: article)));
  }

  @override
  Widget build(BuildContext context) {
    final palette = AppPalette.of(context);
    final filtered = articlesByCategory(_selected);

    return Scaffold(
      backgroundColor: palette.bg,
      appBar: AppBar(
        title: Text(
          "L'Archivio",
          style: TextStyle(fontFamily: 'Playfair Display', fontWeight: FontWeight.w700, fontSize: 17, color: palette.ink),
        ),
      ),
      bottomNavigationBar: const AppBottomNav(currentIndex: 1),
      body: Column(
        children: [
          FadeInUp(
            delay: const Duration(milliseconds: 60),
            child: SizedBox(
              height: 44,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 6),
                children: [
                  _FilterChip(label: 'Tutti', selected: _selected == null, onTap: () => setState(() => _selected = null)),
                  const SizedBox(width: 8),
                  for (final category in ArticleCategory.values) ...[
                    _FilterChip(
                      label: category.shortLabel,
                      selected: _selected == category,
                      onTap: () => setState(() => _selected = category),
                    ),
                    const SizedBox(width: 8),
                  ],
                ],
              ),
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: filtered.isEmpty
                ? Center(
                    child: Text(
                      'Nessun articolo in questa categoria, per ora.',
                      style: TextStyle(fontSize: 13, color: palette.muted),
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.all(18),
                    itemCount: filtered.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, i) {
                      return FadeInUp(
                        delay: Duration(milliseconds: 40 + i * 50),
                        child: ArticleListCard(
                          article: filtered[i],
                          onTap: () => _openArticle(filtered[i]),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({required this.label, required this.selected, required this.onTap});

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final palette = AppPalette.of(context);
    return TapScale(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 220),
        curve: Curves.easeOut,
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
        decoration: BoxDecoration(
          color: selected ? palette.accent : palette.surface,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: selected ? palette.accent : palette.border),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: selected ? palette.bg : palette.ink,
          ),
        ),
      ),
    );
  }
}
