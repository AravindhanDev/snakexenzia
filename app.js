const score = document.querySelector(".score")
const high = document.querySelector(".high")
const speed = document.getElementById("speed")
const music = document.getElementById("music")
let pos = getPosition() || 723
let snake = [721, 722, 723]
let points = 0
let directions = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
let currentDirection = getCurrentDirection()
let currentInterval = getCurrentInterval()
let pointCell = randomCell()
let gameState = getGameState()
let isProtoShow = getProtoShow()
let touchStartX = 0
let touchEndX = 0
let touchStartY = 0
let touchEndY = 0
let speedInMilliSecond = getSpeed()
let isMusicOff = getMusicPermission()

window.addEventListener("load", () => {
	score.textContent = points
	high.textContent = getHighScore()
	setGameState("play")
	setCurrentDirection(currentDirection)
	currentDirection = getCurrentDirection()
	setPosition(723)
	pos = getPosition()
	moveRight(pos)
	setCurrentInterval("rightInterval")
	currentInterval = getCurrentInterval()
	setInitialSnake()
	isMusicOff = getMusicPermission()
	if (isMusicOff) {
		setMusicPermission(true)
		music.firstElementChild.classList.remove("bi-volume-up-fill")
		music.firstElementChild.classList.add("bi-volume-mute-fill")
	} else {
		setMusicPermission(false)
		music.firstElementChild.classList.add("bi-volume-up-fill")
		music.firstElementChild.classList.remove("bi-volume-mute-fill")
	}
	if (isProtoShow) {
		setProtoShow(true)
		document.getElementById("proto").click()
	} else {
		setProtoShow(false)
	}
	setSpeed(speedInMilliSecond)
	if (speedInMilliSecond === 40) {
		speed.options[2].selected = true
	} else if (speedInMilliSecond === 70) {
		speed.options[1].selected = true
	} else {
		speed.options[0].selected = true
	}
})

function setInitialSnake() {
	for (let data of snake) {
		document.getElementById(data).style.background = "#1363DF"
	}
	document.getElementById(pos).style.background = "#1363DF"
	// document.getElementById(pos).style.borderRadius = "0 10px 10px 0"
	document.getElementById(pos).style.backgroundSize = "cover"
	document.getElementById(pos).style.backgroundImage =
		'url("./images/realsnake.png")'
}

function resetGame() {
	if (getHighScore() < points) {
		high.textContent = points
		setHighScore(points)
	}
	points = 0
	score.textContent = points
	for (let data of snake) {
		document.getElementById(data).style.background = "transparent"
	}
	document.getElementById(pointCell).style.background = "transparent"
	document.getElementById(pointCell).classList.remove("random")
	setPosition(723)
	pos = getPosition()
	if (currentDirection === "ArrowLeft") {
		document.getElementById(pos).style.transform = "rotate(180deg)"
		document.getElementById(pos).style.background = "#1363DF"
		document.getElementById(pos).style.borderRadius = "10px 0 0 10px"
	}
	if (currentDirection === "ArrowRight") {
		document.getElementById(pos).style.transform = "rotate(180deg)"
		document.getElementById(pos).style.borderRadius = "10px 0 0 10px"
	}
	if (currentDirection === "ArrowUp") {
		document.getElementById(pos).style.transform = "rotate(180deg)"
		document.getElementById(pos).style.borderRadius = "10px 0 0 10px"
	}
	if (currentDirection === "ArrowDown") {
		console.log("log", pos, currentDirection)
		document.getElementById(pos).style.transform = "rotate(180deg)"
		document.getElementById(pos).style.borderRadius = "10px 0 0 10px"
	}
	setCurrentDirection("ArrowRight")
	currentDirection = getCurrentDirection()
	setCurrentInterval("rightInterval")
	currentInterval = getCurrentInterval()
	snake = [pos - 2, pos - 1, pos]
	setInitialSnake()
	pointCell = randomCell()
}

function moveLeft(pos) {
	setCurrentInterval("leftInterval")
	currentInterval = getCurrentInterval()
	var leftInterval = setInterval(() => {
		if (gameState === "pause") {
			clearInterval(leftInterval)
			return
		}
		if (currentInterval !== "leftInterval") {
			clearInterval(leftInterval)
			return
		}
		if (pos % 40 === 1) {
			alert("Game Over")
			playSound("lost.mp3")
			resetGame()
			clearInterval(leftInterval)
			return
		}
		document.getElementById(snake[0]).style.background = "transparent"
		document.getElementById(snake[0]).style.borderRadius = 0
		document.getElementById(snake[0]).style.backgroundImage = "none"
		document.getElementById(snake[0]).style.transform = "rotate(180deg)"
		pos--
		setPosition(pos)
		if (snake.includes(pos)) {
			playSound("lost.mp3")
			alert("Game Over")
			clearInterval(leftInterval)
			resetGame()
			return
		}
		for (let i = 0; i < snake.length - 1; i++) {
			snake[i] = snake[i + 1]
		}
		snake[snake.length - 1] = pos
		if (pos === pointCell) {
			playSound("bite.wav")
			points++
			snake.unshift(snake[0] + 1)
			document.getElementById(pos).classList.remove("random")
			pointCell = randomCell()
			score.textContent = points
		}
		for (let data of snake) {
			document.getElementById(data).style.background = "#1363DF"
			document.getElementById(data).style.borderRadius = 0
		}
		document.getElementById(pos).style.background = "#1363DF"
		document.getElementById(pos).style.borderRadius = "0 10px 10px 0"
		document.getElementById(pos).style.backgroundImage =
			'url("./images/realsnake.png")'
		document.getElementById(pos).style.backgroundSize = "cover"
		document.getElementById(pos).style.transform = "rotate(180deg)"
		if (points === getHighScore() + 1) {
			playSound("clap.mp3")
		}
	}, speedInMilliSecond)
}

function moveRight(pos) {
	setCurrentInterval("rightInterval")
	currentInterval = getCurrentInterval()
	var rightInterval = setInterval(() => {
		if (gameState === "pause") {
			clearInterval(rightInterval)
			return
		}
		if (currentInterval !== "rightInterval") {
			clearInterval(rightInterval)
			return
		}
		if (pos % 40 === 0) {
			playSound("lost.mp3")
			alert("Game Over")
			resetGame()
			clearInterval(rightInterval)
			return
		}
		document.getElementById(snake[0]).style.background = "transparent"
		document.getElementById(snake[0]).style.borderRadius = 0
		document.getElementById(snake[0]).style.backgroundImage = "none"
		document.getElementById(snake[0]).style.transform = "rotate(90deg)"
		pos++
		setPosition(pos)
		if (snake.includes(pos)) {
			alert("Game Over")
			playSound("lost.mp3")
			clearInterval(rightInterval)
			resetGame()
			return
		}
		for (let i = 0; i < snake.length - 1; i++) {
			snake[i] = snake[i + 1]
		}
		snake[snake.length - 1] = pos
		if (pos === pointCell) {
			playSound("bite.wav")
			points++
			snake.unshift(snake[0] - 1)
			score.textContent = points
			document.getElementById(pos).classList.remove("random")
			pointCell = randomCell()
		}
		for (let data of snake) {
			document.getElementById(data).style.background = "#1363DF"
			document.getElementById(data).style.borderRadius = 0
		}
		document.getElementById(pos).style.borderRadius = "10px 0 0 10px"
		document.getElementById(pos).style.backgroundImage =
			'url("./images/realsnake.png")'
		document.getElementById(pos).style.backgroundSize = "cover"
		document.getElementById(pos).style.transform = "rotate(180deg)"
		if (points === getHighScore() + 1) {
			playSound("clap.mp3")
		}
	}, speedInMilliSecond)
}

function moveUp(pos) {
	setCurrentInterval("upInterval")
	currentInterval = getCurrentInterval()
	var upInterval = setInterval(() => {
		if (gameState === "pause") {
			clearInterval(upInterval)
			return
		}
		if (currentInterval !== "upInterval") {
			clearInterval(upInterval)
			return
		}
		if (pos <= 40) {
			alert("Game Over")
			playSound("lost.mp3")
			resetGame()
			clearInterval(upInterval)
			return
		}
		document.getElementById(snake[0]).style.background = "transparent"
		document.getElementById(snake[0]).style.borderRadius = 0
		document.getElementById(snake[0]).style.backgroundImage = "none"
		document.getElementById(snake[0]).style.transform = "rotate(90deg)"
		pos -= 40
		setPosition(pos)
		if (snake.includes(pos)) {
			alert("Game Over")
			playSound("lost.mp3")
			clearInterval(upInterval)
			resetGame()
			return
		}
		for (let i = 0; i < snake.length - 1; i++) {
			snake[i] = snake[i + 1]
		}
		snake[snake.length - 1] = pos
		if (pos === pointCell) {
			playSound("bite.wav")
			points++
			snake.unshift(snake[0] + 10)
			score.textContent = points
			document.getElementById(pos).classList.remove("random")
			pointCell = randomCell()
		}
		console.log(snake)
		for (let data of snake) {
			document.getElementById(data).style.background = "#1363DF"
			document.getElementById(data).style.borderRadius = 0
		}
		document.getElementById(pos).style.background = "#1363DF"
		document.getElementById(pos).style.borderRadius = "10px 0 0 10px"
		document.getElementById(pos).style.backgroundImage =
			'url("./images/realsnake.png")'
		document.getElementById(pos).style.backgroundSize = "cover"
		document.getElementById(pos).style.transform = "rotate(90deg)"
		if (points === getHighScore() + 1) {
			playSound("clap.mp3")
		}
	}, speedInMilliSecond)
}

function moveDown(pos) {
	setCurrentInterval("downInterval")
	currentInterval = getCurrentInterval()
	var downInterval = setInterval(() => {
		if (gameState === "pause") {
			clearInterval(downInterval)
			return
		}
		if (currentInterval !== "downInterval") {
			clearInterval(downInterval)
			return
		}
		if (pos >= 1561) {
			alert("Game Over")
			playSound("lost.mp3")
			resetGame()
			clearInterval(downInterval)
			return
		}
		document.getElementById(snake[0]).style.background = "transparent"
		document.getElementById(snake[0]).style.borderRadius = 0
		document.getElementById(snake[0]).style.backgroundImage = "none"
		document.getElementById(snake[0]).style.transform = "rotate(90deg)"
		pos += 40
		setPosition(pos)
		if (snake.includes(pos)) {
			alert("Game Over")
			playSound("lost.mp3")
			clearInterval(downInterval)
			resetGame()
			return
		}
		for (let i = 0; i < snake.length - 1; i++) {
			snake[i] = snake[i + 1]
		}
		snake[snake.length - 1] = pos
		if (pos === pointCell) {
			playSound("bite.wav")
			points++
			snake.unshift(snake[0] - 10)
			score.textContent = points
			document.getElementById(pos).classList.remove("random")
			pointCell = randomCell()
		}
		for (let data of snake) {
			document.getElementById(data).style.background = "#1363DF"
			document.getElementById(data).style.borderRadius = 0
		}
		document.getElementById(pos).style.background = "#1363DF"
		document.getElementById(pos).style.borderRadius = "0 10px 10px 0"
		document.getElementById(pos).style.backgroundImage =
			'url("./images/realsnake.png")'
		document.getElementById(pos).style.backgroundSize = "cover"
		document.getElementById(pos).style.transform = "rotate(90deg)"
		if (points === getHighScore() + 1) {
			playSound("clap.mp3")
		}
	}, speedInMilliSecond)
}

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX
	touchStartY = e.changedTouches[0].screenY
})

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX
	touchEndY = e.changedTouches[0].screenY
	checkSwipeDirection()
})

document.getElementById("proto").addEventListener("click", (e) => {
	setProtoShow(e.target.checked)
	if (e.target.checked === true) {
		let element = document.getElementById("snake-boxes")
		let elements = document.querySelectorAll(".snake-box")
		for (let ele of elements) {
			ele.style.border = "1px solid #ddd"
			ele.style.borderRadius = "0"
			ele.firstElementChild.style.background = "#fff"
		}
		element.style.backgroundImage = "none"
		element.style.background = "#fff"
	} else {
		let element = document.getElementById("snake-boxes")
		let elements = document.querySelectorAll(".snake-box")
		for (let ele of elements) {
			ele.style.border = "1px solid transparent"
			ele.firstElementChild.style.background = "#EAEA7F"
		}
		element.style.background = "#dfe8cc"
		element.style.backgroundImage =
			'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")'
	}
})

speed.addEventListener("change", (e) => {
	let value = parseInt(e.target.value)
	console.log(value)
	setSpeed(value)
	speedInMilliSecond = getSpeed()
})

function checkSwipeDirection() {
	let WhichDirection = ""
	let horDiff = Math.abs(touchStartX - touchEndX)
	let verDiff = Math.abs(touchStartY - touchEndY)
	if (horDiff > verDiff) {
		if (touchStartX < touchEndX) {
			WhichDirection = "ArrowRight"
		} else {
			WhichDirection = "ArrowLeft"
		}
	} else {
		if (touchStartY < touchEndY) {
			WhichDirection = "ArrowDown"
		} else {
			WhichDirection = "ArrowUp"
		}
	}
	console.log(WhichDirection)
	let isAllowed = checkDirectionErrors(WhichDirection, currentDirection)
	if (isAllowed) {
		setCurrentDirection(WhichDirection)
		currentDirection = getCurrentDirection()
	} else {
		return
	}
	pos = getPosition()
	if (WhichDirection === "ArrowLeft") {
		moveLeft(pos)
	}
	if (WhichDirection === "ArrowRight") {
		moveRight(pos)
	}
	if (WhichDirection === "ArrowUp") {
		moveUp(pos)
	}
	if (WhichDirection === "ArrowDown") {
		moveDown(pos)
	}
}

document.addEventListener("dblclick", () => {
	if (gameState === "pause") {
		gameState = "play"
		setGameState(gameState)
		pos = getPosition()
		if (currentInterval === "leftInterval") {
			moveLeft(pos)
		} else if (currentInterval === "rightInterval") {
			moveRight(pos)
		} else if (currentInterval === "upInterval") {
			moveUp(pos)
		} else {
			moveDown(pos)
		}
	} else {
		gameState = "pause"
		setGameState(gameState)
	}
})

document.addEventListener("keydown", (e) => {
	if (!directions.includes(e.key)) {
		return
	}
	let isAllowed = checkDirectionErrors(e.key, currentDirection)
	if (isAllowed) {
		setCurrentDirection(e.key)
		currentDirection = getCurrentDirection()
	} else {
		return
	}
	pos = getPosition()
	if (e.key === "ArrowLeft") {
		moveLeft(pos)
	}
	if (e.key === "ArrowRight") {
		moveRight(pos)
	}
	if (e.key === "ArrowUp") {
		moveUp(pos)
	}
	if (e.key === "ArrowDown") {
		moveDown(pos)
	}
})

document.addEventListener("keyup", (e) => {
	if (e.key === " ") {
		if (gameState === "pause") {
			gameState = "play"
			setGameState(gameState)
			pos = getPosition()
			if (currentInterval === "leftInterval") {
				moveLeft(pos)
			} else if (currentInterval === "rightInterval") {
				moveRight(pos)
			} else if (currentInterval === "upInterval") {
				moveUp(pos)
			} else {
				moveDown(pos)
			}
		} else {
			gameState = "pause"
			setGameState(gameState)
		}
	}
})

music.addEventListener("click", (e) => {
	isMusicOff = getMusicPermission()
	if (isMusicOff) {
		setMusicPermission(false)
		isMusicOff = getMusicPermission()
		e.currentTarget.firstElementChild.classList.add("bi-volume-up-fill")
		e.currentTarget.firstElementChild.classList.remove("bi-volume-mute-fill")
		isMusicPlay = false
	} else {
		setMusicPermission(true)
		isMusicOff = getMusicPermission()
		e.currentTarget.firstElementChild.classList.remove("bi-volume-up-fill")
		e.currentTarget.firstElementChild.classList.add("bi-volume-mute-fill")
		isMusicPlay = true
	}
})

// utilities

function playSound(name) {
	console.log(isMusicOff)
	if (!isMusicOff) {
		const audio = new Audio(`./sounds/${name}`)
		audio.play()
	} else {
		return
	}
}

function getTime() {
	return parseInt(localStorage.getItem("time")) || 0
}

function setTime(time) {
	localStorage.setItem("time", time)
}

function checkDirectionErrors(keyPressed, currentDirection) {
	let value = Date.now()
	if (value - getTime() < 80) {
		return false
	}
	setTime(value)

	if (currentDirection === "ArrowLeft") {
		if (keyPressed === "ArrowRight" || keyPressed === "ArrowLeft") return false
		return true
	} else if (currentDirection === "ArrowRight") {
		if (keyPressed === "ArrowLeft" || keyPressed === "ArrowRight") return false
		return true
	} else if (currentDirection === "ArrowUp") {
		if (keyPressed === "ArrowDown" || keyPressed === "ArrowUp") return false
		return true
	} else if (currentDirection === "ArrowDown") {
		if (keyPressed === "ArrowUp" || keyPressed === "ArrowDown") return false
		return true
	}
}

function getGameState() {
	localStorage.getItem("gameState") || "play"
}

function setGameState(state) {
	localStorage.setItem("gameState", state)
}

function getCurrentInterval() {
	return localStorage.getItem("currentInterval") || ""
}

function getCurrentDirection() {
	return localStorage.getItem("currentDirection") || "ArrowRight"
}

function setCurrentDirection(direction) {
	localStorage.setItem("currentDirection", direction)
}

function setCurrentInterval(interval) {
	localStorage.setItem("currentInterval", interval)
}

function removeCurrentDirection() {
	localStorage.removeItem("currentDirection")
}

function getPosition() {
	return parseInt(localStorage.getItem("position")) || 723
}

function setPosition(pos) {
	localStorage.setItem("position", pos)
}

function randomCell() {
	let id = 0
	for (let i = 0; i < 40; i++) {
		id = Math.round(Math.random() * 1599) + 1
		if (snake.includes(id)) continue
		break
	}
	document.getElementById(id).style.background = "rgba(255, 0, 99, 1)"
	document.getElementById(id).classList.add("random")
	return id
}

function getProtoShow() {
	return JSON.parse(localStorage.getItem("protoShow")) || false
}

function setProtoShow(proto) {
	localStorage.setItem("protoShow", proto)
}

function getHighScore() {
	return parseInt(localStorage.getItem("highScore")) || 0
}

function setHighScore(score) {
	localStorage.setItem("highScore", score)
}

function getSpeed() {
	return parseInt(localStorage.getItem("speed")) || 100
}

function setSpeed(speed) {
	localStorage.setItem("speed", speed)
}

function getMusicPermission() {
	return JSON.parse(localStorage.getItem("music")) || false
}

function setMusicPermission(value) {
	localStorage.setItem("music", value)
}
