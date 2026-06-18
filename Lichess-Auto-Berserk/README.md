# Lichess Auto Berserk

This Tampermonkey script automatically clicks the Berserk button at the start of a Lichess game when your available clock time is at or above a configurable threshold.

## Usage

1. Install a userscript manager extension (Tampermonkey, Greasemonkey, or Violentmonkey).
2. Add the `Lichess-Auto-Berserk.js` script to your userscript manager.
3. Adjust `MIN_SECONDS` in the script if you want a different minimum time threshold.
4. Open Lichess and start a game where Berserk is available.

The script checks for the berserk button every 500ms and clicks it once when the threshold is met.
