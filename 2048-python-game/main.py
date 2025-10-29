import curses
import random
from typing import List, Tuple


GRID_SIZE = 4


def init_board() -> List[List[int]]:
    board = [[0 for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]
    add_random_tile(board)
    add_random_tile(board)
    return board


def add_random_tile(board: List[List[int]]) -> None:
    empty = [(r, c) for r in range(GRID_SIZE) for c in range(GRID_SIZE) if board[r][c] == 0]
    if not empty:
        return
    r, c = random.choice(empty)
    board[r][c] = 4 if random.random() < 0.1 else 2


def compress(line: List[int]) -> List[int]:
    new_line = [x for x in line if x != 0]
    new_line += [0] * (GRID_SIZE - len(new_line))
    return new_line


def merge(line: List[int]) -> Tuple[List[int], int]:
    score_gain = 0
    for i in range(GRID_SIZE - 1):
        if line[i] != 0 and line[i] == line[i + 1]:
            line[i] *= 2
            score_gain += line[i]
            line[i + 1] = 0
    return line, score_gain


def move_left(board: List[List[int]]) -> Tuple[List[List[int]], int, bool]:
    moved = False
    score_gain_total = 0
    new_board = []
    for row in board:
        compressed = compress(row)
        merged, score_gain = merge(compressed)
        compressed_again = compress(merged)
        if compressed_again != row:
            moved = True
        new_board.append(compressed_again)
        score_gain_total += score_gain
    return new_board, score_gain_total, moved


def reverse(board: List[List[int]]) -> List[List[int]]:
    return [list(reversed(row)) for row in board]


def transpose(board: List[List[int]]) -> List[List[int]]:
    return [list(row) for row in zip(*board)]


def move_right(board: List[List[int]]) -> Tuple[List[List[int]], int, bool]:
    reversed_board = reverse(board)
    moved_board, score_gain, moved = move_left(reversed_board)
    return reverse(moved_board), score_gain, moved


def move_up(board: List[List[int]]) -> Tuple[List[List[int]], int, bool]:
    transposed = transpose(board)
    moved_board, score_gain, moved = move_left(transposed)
    return transpose(moved_board), score_gain, moved


def move_down(board: List[List[int]]) -> Tuple[List[List[int]], int, bool]:
    transposed = transpose(board)
    moved_board, score_gain, moved = move_right(transposed)
    return transpose(moved_board), score_gain, moved


def can_move(board: List[List[int]]) -> bool:
    for r in range(GRID_SIZE):
        for c in range(GRID_SIZE):
            if board[r][c] == 0:
                return True
            if c + 1 < GRID_SIZE and board[r][c] == board[r][c + 1]:
                return True
            if r + 1 < GRID_SIZE and board[r][c] == board[r + 1][c]:
                return True
    return False


def draw_board(stdscr, board: List[List[int]], score: int) -> None:
    stdscr.clear()
    height, width = stdscr.getmaxyx()

    title = "2048 - Arrow Keys to play, q to quit (also WASD)"
    score_line = f"Score: {score}"
    info_line = "Combine tiles with same numbers."

    start_y = 1
    stdscr.addstr(start_y, max(0, (width - len(title)) // 2), title)
    stdscr.addstr(start_y + 1, max(0, (width - len(score_line)) // 2), score_line)
    stdscr.addstr(start_y + 2, max(0, (width - len(info_line)) // 2), info_line)

    cell_width = 6
    grid_top = start_y + 4
    grid_left = max(0, (width - (GRID_SIZE * cell_width + (GRID_SIZE + 1))) // 2)

    for r in range(GRID_SIZE):
        # horizontal separator
        sep_y = grid_top + r * 2
        stdscr.addstr(sep_y, grid_left, "+" + "+".join(["-" * cell_width for _ in range(GRID_SIZE)]) + "+")
        # row values
        row_y = sep_y + 1
        row_str = "|"
        for c in range(GRID_SIZE):
            val = board[r][c]
            text = f"{val}" if val != 0 else ""
            row_str += text.center(cell_width) + "|"
        stdscr.addstr(row_y, grid_left, row_str)

    # bottom separator
    stdscr.addstr(grid_top + GRID_SIZE * 2, grid_left, "+" + "+".join(["-" * cell_width for _ in range(GRID_SIZE)]) + "+")

    stdscr.refresh()


def game_loop(stdscr) -> None:
    curses.curs_set(0)
    stdscr.nodelay(False)
    stdscr.keypad(True)

    board = init_board()
    score = 0

    while True:
        draw_board(stdscr, board, score)
        if not can_move(board):
            msg = "Game Over! Press r to restart or q to quit."
            h, w = stdscr.getmaxyx()
            stdscr.addstr(h - 2, max(0, (w - len(msg)) // 2), msg)
            stdscr.refresh()
            key = stdscr.getch()
            if key in (ord('q'), ord('Q')):
                break
            if key in (ord('r'), ord('R')):
                board = init_board()
                score = 0
                continue
            else:
                continue

        key = stdscr.getch()

        moved = False
        gained = 0

        if key in (curses.KEY_LEFT, ord('a'), ord('A')):
            board, gained, moved = move_left(board)
        elif key in (curses.KEY_RIGHT, ord('d'), ord('D')):
            board, gained, moved = move_right(board)
        elif key in (curses.KEY_UP, ord('w'), ord('W')):
            board, gained, moved = move_up(board)
        elif key in (curses.KEY_DOWN, ord('s'), ord('S')):
            board, gained, moved = move_down(board)
        elif key in (ord('q'), ord('Q')):
            break
        else:
            continue

        if moved:
            score += gained
            add_random_tile(board)


def main() -> None:
    curses.wrapper(game_loop)


if __name__ == "__main__":
    main()


