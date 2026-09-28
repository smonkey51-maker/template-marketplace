import 'package:flutter/material.dart';

/// Mirrors `ArticleCategory` in the web repo's `lib/articles.ts` — the
/// four "Il Taccuino di Jane" macro-categories.
enum ArticleCategory { corpo, persuasione, mentalismo, controManipolazione }

extension ArticleCategoryLabel on ArticleCategory {
  String get label {
    switch (this) {
      case ArticleCategory.corpo:
        return 'Linguaggio del Corpo';
      case ArticleCategory.persuasione:
        return 'Persuasione';
      case ArticleCategory.mentalismo:
        return 'Mentalismo & Cold Reading';
      case ArticleCategory.controManipolazione:
        return 'Contro-Manipolazione';
    }
  }

  String get shortLabel {
    switch (this) {
      case ArticleCategory.corpo:
        return 'Corpo';
      case ArticleCategory.persuasione:
        return 'Persuasione';
      case ArticleCategory.mentalismo:
        return 'Mentalismo';
      case ArticleCategory.controManipolazione:
        return 'Contro-Manip.';
    }
  }
}

/// A single callout box inside an article body — the app equivalent of
/// the site's `:::callout Title ... :::` grammar in `ArticleBody.tsx`.
class ArticleCallout {
  const ArticleCallout({required this.title, required this.body});

  final String title;
  final String body;
}

class Article {
  const Article({
    required this.slug,
    required this.category,
    required this.title,
    required this.description,
    required this.paragraphs,
    required this.tags,
    required this.readMinutes,
    required this.gradient,
    this.callout,
    this.person,
    this.isGuide = false,
  });

  final String slug;
  final ArticleCategory category;
  final String title;
  final String description;
  final List<String> paragraphs;
  final List<String> tags;
  final int readMinutes;
  final List<Color> gradient;
  final ArticleCallout? callout;
  final String? person;
  final bool isGuide;
}
