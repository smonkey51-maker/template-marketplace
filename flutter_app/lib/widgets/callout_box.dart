import 'package:flutter/material.dart';

import '../theme/app_colors.dart';

/// "L'Osservazione Chiave" highlight box — mirrors `.fn-callout` in the
/// web repo's `app/globals.css`: a `--surface-2` background with a
/// load-bearing accent-coloured left rule.
class CalloutBox extends StatelessWidget {
  const CalloutBox({super.key, required this.title, required this.body});

  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    final palette = AppPalette.of(context);
    return Container(
      decoration: BoxDecoration(
        color: palette.surface2,
        borderRadius: BorderRadius.circular(4),
        border: Border(left: BorderSide(color: palette.accent, width: 3)),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title.toUpperCase(),
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w700,
              letterSpacing: 1.4,
              color: palette.accent,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            body,
            style: TextStyle(fontSize: 13, height: 1.6, color: palette.ink),
          ),
        ],
      ),
    );
  }
}
