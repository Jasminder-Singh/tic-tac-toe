const box = document.getElementById('box');
let play = true;
let matrix = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']];
let robot = false;
let count = 0;


const n = 3;
for (let i = 0; i < n; i++) {

    for (let j = 0; j < n; j++) {
        const span = document.createElement('span');


        span.id = `${i}${j}`;
        span.addEventListener('click', (e) => {
            // Robot color is purple and player color is red;

            if (robot && !e.target.innerHTML && play) {
                e.target.innerHTML = 'X';
                e.target.style.color = 'red';
                robot = false;
                const index = e.target.id;
                matrix[index[0]][index[1]] = 'X';
                count++;

                if (count >= 5) {
                    const won = validate('X');
                    if (won) {
                        play = false;
                        setTimeout(() => {
                            restart();
                        }, 2000)
                    }

                }
            } else if (!robot && !e.target.innerHTML && play) {
                e.target.innerHTML = 'O';
                e.target.style.color = 'green';
                robot = true;
                count++;
                const index = e.target.id;
                matrix[index[0]][index[1]] = 'O';
                if (count >= 5) {
                    const won = validate('O');
                    if (won) {
                        play = false;
                        setTimeout(() => {
                            restart();
                        }, 2000)
                    }
                }
            }

        });
        box.appendChild(span);
    }
}

function restart() {
    const spans = box.children;
    play = true;
    for (let i = 0; i < spans.length; i++) {
        spans[i].textContent = '';
    }
    matrix = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']];
    robot = false;
}

function validate(symbol) {
    // check for each row.

    for (let row = 0; row < n; row++) {
        let count = 0;
        let arr = [];
        for (let col = 0; col < n; col++) {
            if (matrix[row][col] === symbol) {
                count++;
                arr.push(document.getElementById(`${row}${col}`));
            }
        }
        if (count === 3) {
            arr.forEach(span => {
                const newSpan = document.createElement('span');
                newSpan.classList.add('row');
                span.appendChild(newSpan);
            })
            return true;
        }
    }

    // check for each column.
    for (let col = 0; col < n; col++) {
        let count = 0;
        let arr = [];
        for (let row = 0; row < n; row++) {
            if (matrix[row][col] === symbol) {
                count++;
                arr.push(document.getElementById(`${row}${col}`));
            }
        }
        if (count === 3) {
            arr.forEach(span => {
                const newSpan = document.createElement('span');
                newSpan.classList.add('column');
                span.appendChild(newSpan);
            })
            return true;
        }
    }

    // check left diagonal;
    if (matrix[0][0] === symbol && matrix[1][1] === symbol && matrix[2][2] === symbol) {
        const one = document.getElementById('00');
        const two = document.getElementById('11');
        const three = document.getElementById('22');
        const arr = [one, two, three];

        arr.forEach(span => {
            const newSpan = document.createElement('span');
            newSpan.classList.add('leftDiagonal');
            span.appendChild(newSpan);
        })
        return true;
    }

    if (matrix[0][2] === symbol && matrix[1][1] === symbol && matrix[2][0] === symbol) {
        const one = document.getElementById('02');
        const two = document.getElementById('11');
        const three = document.getElementById('20');
        const arr = [one, two, three];

        arr.forEach(span => {
            const newSpan = document.createElement('span');
            newSpan.classList.add('rightDiagonal');
            span.appendChild(newSpan);
        })
        return true;
    }

    return false;
}

// function robotTurn(){

// }
