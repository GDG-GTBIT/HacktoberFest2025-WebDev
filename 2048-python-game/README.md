# 2048 Python (Terminal)

A simple terminal version of 2048 written in Python using `curses` (no external dependencies).

## How to run

- Ensure you have Python 3.8+ installed.
- Open a terminal in this folder and run:

```bash
python3 main.py
```

## Controls

- Arrow Keys or WASD to move
- q to quit
- r to restart when game over

## Notes

- The game uses your terminal size for centering the board. If rendering looks off, enlarge your terminal window.
- On Windows, you may need to install `windows-curses` and run with `py -m pip install windows-curses`. macOS/Linux should work out-of-the-box.
