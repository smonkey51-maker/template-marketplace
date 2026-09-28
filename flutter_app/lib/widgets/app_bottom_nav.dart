import 'package:flutter/material.dart';

import '../screens/archivio_screen.dart';
import '../screens/home_screen.dart';
import '../routes/fade_slide_route.dart';

/// The four "Il Taccuino di Jane" sections from the web nav
/// (`SiteNav.tsx`): L'Archivio, Dossier Personaggi, Guide Pratiche,
/// La Biblioteca — here condensed to Home + Archivio + two stubs that
/// reuse the Archivio screen, since this mockup only implements those
/// two screens in full.
class AppBottomNav extends StatelessWidget {
  const AppBottomNav({super.key, required this.currentIndex});

  final int currentIndex;

  static const _labels = ['Home', 'Archivio', 'Dossier', 'Biblioteca'];
  static const _icons = [Icons.home_outlined, Icons.menu_book_outlined, Icons.groups_outlined, Icons.local_library_outlined];
  static const _selectedIcons = [Icons.home, Icons.menu_book, Icons.groups, Icons.local_library];

  void _navigate(BuildContext context, int index) {
    if (index == currentIndex) return;
    final route = index == 0
        ? FadeSlideRoute(page: const HomeScreen())
        : FadeSlideRoute(page: const ArchivioScreen());
    Navigator.of(context).pushAndRemoveUntil(route, (r) => false);
  }

  @override
  Widget build(BuildContext context) {
    return NavigationBar(
      selectedIndex: currentIndex,
      onDestinationSelected: (i) => _navigate(context, i),
      destinations: List.generate(_labels.length, (i) {
        return NavigationDestination(
          icon: Icon(_icons[i]),
          selectedIcon: Icon(_selectedIcons[i]),
          label: _labels[i],
        );
      }),
    );
  }
}
