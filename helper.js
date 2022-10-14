let pos = 9
let len = 9
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function moveDown(pos) {
	let interval = setInterval(() => {
		if (pos >= 1561) {
			console.log("Game Over")
			clearInterval(interval)
			return
		}
		pos += 15
		for (let i = 0; i < len - 1; i++) {
			arr[i] = arr[i + 1]
		}
		arr[arr.length - 1] = pos
		console.log(arr)
	}, 1000)
}

function moveUp(pos) {
	let interval = setInterval(() => {
		if (pos <= 40) {
			console.log("Game Over")
			clearInterval(interval)
			return
		}
		pos -= 15
		for (let i = 0; i < len - 1; i++) {
			arr[i] = arr[i + 1]
		}
		arr[arr.length - 1] = pos
		console.log(arr)
	}, 1000)
}

function moveLeft(pos) {
	let interval = setInterval(() => {
		if (pos % 40 === 1) {
			console.log("Game Over")
			clearInterval(interval)
			return
		}
		pos--
		for (let i = 0; i < len - 1; i++) {
			arr[i] = arr[i + 1]
		}
		arr[arr.length - 1] = pos
		console.log(arr)
	}, 1000)
}

function moveRight(pos) {
	let interval = setInterval(() => {
		if (pos % 40 === 0) {
			console.log("Game Over")
			clearInterval(interval)
			return
		}
		pos++
		for (let i = 0; i < len - 1; i++) {
			arr[i] = arr[i + 1]
		}
		arr[arr.length - 1] = pos
		console.log(arr)
	}, 1000)
}

/* 
algorithm: 
Function POS
sideOperation eg for left -1 for right + 1 for up -10
update array with previous values
update last index of array
console the array
repeat it every second using interval 
until condition met if condition met
then clear the interval

logic:
for left -1 & pos % 15 === 1
for right +1 & pos % 5 === 0
for up -10 & pos <= 15
for down +10 & pos >= 211
*/
