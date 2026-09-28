import 'package:flutter/material.dart';

import '../data/articles_data.dart';
import '../models/article.dart';
import '../routes/fade_slide_route.dart';
import '../theme/app_colors.dart';
import '../widgets/app_bottom_nav.dart';
import '../widgets/article_card.dart';
import '../widgets/fade_in_up.dart';
import '../widgets/tap_scale.dart';
import 'archivio_screen.dart';
import 'article_detail_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  void _openArticle(BuildContext context, Article article) {
    Navigator.of(context).push(FadeSlideRoute(page: ArticleDetailScreen(article: article)));
  }

  void _openArchivio(BuildContext context) {
    Navigator.of(context).push(FadeSlideRoute(page: const ArchivioScreen()));
  }

  @override
  Widget build(BuildContext context) {
    final palette = AppPalette.of(context);
    final featured = articles.take(2).toList();

    return Scaffold(
      backgroundColor: palette.bg,
      appBar: AppBar(
        title: Text(
          'OSSERVATORIO',
          style: TextStyle(
            fontFamily: 'Playfair Display',
            fontWeight: FontWeight.w800,
            fontSize: 15,
            letterSpacing: 1.2,
            color: palette.accent,
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: TapScale(
              onTap: () {},
              child: CircleAvatar(
                radius: 17,
                backgroundColor: palette.surface2,
                child: Icon(Icons.search, size: 17, color: palette.ink),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: const AppBottomNav(currentIndex: 0),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(18, 20, 18, 28),
        children: [
          FadeInUp(
            delay: const Duration(milliseconds: 50),
            child: Text(
              'OSSERVAZIONE · PSICOLOGIA · FINZIONE',
              style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 2, color: palette.muted),
            ),
          ),
          const SizedBox(height: 10),
          FadeInUp(
            delay: const Duration(milliseconds: 100),
            child: Text(
              "Osservare come Jane.\nCapire cosa c'è di vero.",
              style: TextStyle(
                fontFamily: 'Playfair Display',
                fontWeight: FontWeight.w700,
                fontSize: 27,
                height: 1.15,
                color: palette.ink,
              ),
            ),
          ),
          const SizedBox(height: 10),
          FadeInUp(
            delay: const Duration(milliseconds: 160),
            child: Text(
              'La fiction come punto di partenza, la psicologia come metodo.',
              style: TextStyle(
                fontFamily: 'Playfair Display',
                fontStyle: FontStyle.italic,
                fontSize: 13,
                height: 1.5,
                color: palette.accent,
              ),
            ),
          ),
          const SizedBox(height: 20),
          FadeInUp(
            delay: const Duration(milliseconds: 200),
            child: Row(
              children: [
                Expanded(
                  child: TapScale(
                    onTap: () => _openArchivio(context),
                    child: Container(
                      alignment: Alignment.center,
                      padding: const EdgeInsets.symmetric(vertical: 13),
                      decoration: BoxDecoration(color: palette.accent, borderRadius: BorderRadius.circular(10)),
                      child: Text(
                        "ESPLORA L'ARCHIVIO",
                        style: TextStyle(color: palette.bg, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 0.4),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                TapScale(
                  onTap: () => _openArticle(context, articles.first),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: palette.border.withOpacity(1)),
                    ),
                    child: Text('Il metodo Jane', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: palette.ink)),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 26),
          FadeInUp(
            delay: const Duration(milliseconds: 240),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  'In evidenza',
                  style: TextStyle(fontFamily: 'Playfair Display', fontWeight: FontWeight.w700, fontSize: 18, color: palette.ink),
                ),
                TextButton(
                  onPressed: () => _openArchivio(context),
                  child: Text('Vedi tutto →', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: palette.accent)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 4),
          SizedBox(
            height: 172,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: featured.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (context, i) {
                return FadeInUp(
                  delay: Duration(milliseconds: 280 + i * 60),
                  child: FeaturedArticleCard(
                    article: featured[i],
                    onTap: () => _openArticle(context, featured[i]),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 26),
          FadeInUp(
            delay: const Duration(milliseconds: 380),
            child: Text(
              'Osserva. Comprendi. Applica.',
              style: TextStyle(fontFamily: 'Playfair Display', fontWeight: FontWeight.w700, fontSize: 18, color: palette.ink),
            ),
          ),
          const SizedBox(height: 10),
          FadeInUp(
            delay: const Duration(milliseconds: 380),
            child: Row(
              children: const [
                _MiniStep(number: '01', label: 'Osserva'),
                SizedBox(width: 10),
                _MiniStep(number: '02', label: 'Comprendi'),
                SizedBox(width: 10),
                _MiniStep(number: '03', label: 'Applica'),
              ],
            ),
          ),
          const SizedBox(height: 22),
          FadeInUp(
            delay: const Duration(milliseconds: 420),
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: palette.surface2, borderRadius: BorderRadius.circular(12)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Il Taccuino di Jane', style: TextStyle(fontFamily: 'Playfair Display', fontWeight: FontWeight.w700, fontSize: 15, color: palette.ink)),
                  const SizedBox(height: 8),
                  Text(
                    "Una volta a settimana: un'osservazione, una tecnica e un dettaglio da guardare meglio.",
                    style: TextStyle(fontSize: 12, height: 1.5, color: palette.muted),
                  ),
                  const SizedBox(height: 12),
                  TapScale(
                    onTap: () {},
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 9),
                      decoration: BoxDecoration(color: palette.accent, borderRadius: BorderRadius.circular(8)),
                      child: Text('Iscriviti', style: TextStyle(color: palette.bg, fontSize: 11, fontWeight: FontWeight.w700)),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _MiniStep extends StatelessWidget {
  const _MiniStep({required this.number, required this.label});

  final String number;
  final String label;

  @override
  Widget build(BuildContext context) {
    final palette = AppPalette.of(context);
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 12),
        decoration: BoxDecoration(
          color: palette.surface,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: palette.border),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(number, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: palette.accent)),
            const SizedBox(height: 4),
            Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: palette.ink)),
          ],
        ),
      ),
    );
  }
}
