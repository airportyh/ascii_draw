
function clear_screen() {
    write('\x1B[0m')
    write('\x1B[2J')
    write('\x1Bc')
}

function print_at(x, y, value) {
    goto(x, y)
    process.stdout.write(value)
    goto(x, y)
}

function goto(x, y) {
    write(`\x1B[${y};${x}f`)
}

// stoles from charm
function set_cursor_visible(visible) {
    write(visible ? '[?25h' : '[?25l')
}

function write(value) {
    process.stdout.write('\x1B' + value);
}

function is_left_arrow(data) {
    return String(data) === '\x1B[D'
}

function is_right_arrow(data) {
    return String(data) === '\x1B[C'
}

function is_up_arrow(data) {
    return String(data) === '\x1B[A'
}

function is_down_arrow(data) {
    return String(data) === '\x1B[B'
}
    
function main() {
    let cursor = { x: 1, y: 1 }
    process.stdin.setRawMode(true)
    process.stdin.on('data', (data) => {
        if (String(data) === 'q') {
            process.stdin.setRawMode(false)
            set_cursor_visible(true)
            write("\n")
            process.exit(0)
        } else if (is_up_arrow(data)) {
            cursor.y--;
            if (cursor.y < 1) {
                cursor.y = 1;
            }
            goto(cursor.x, cursor.y)
        } else if (is_down_arrow(data)) {
            cursor.y++;
            const [w, h] = process.stdout.getWindowSize();
            if (cursor.y > h) {
                cursor.y = h;
            }
            goto(cursor.x, cursor.y)
        } else if (is_left_arrow(data)) {
            cursor.x--;
            if (cursor.x < 1) {
                cursor.x = 1;
            }
            goto(cursor.x, cursor.y)
        } else if (is_right_arrow(data)) {
            cursor.x++;
            const [w, h] = process.stdout.getWindowSize();
            if (cursor.x > w) {
                cursor.x = w;
            }
            goto(cursor.x, cursor.y)
        } else {
            print_at(cursor.x, cursor.y, data)
        }
    });
    clear_screen()
}

main()