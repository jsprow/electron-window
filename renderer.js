const remote = require('electron').remote,
	path = remote.getGlobal('path'),
	fs = require('fs'),
	kioskTxt = `${path}/kiosk.txt`,
	renderTarget = document.getElementById('renderTarget'),
	inputBox = document.getElementById('inputBox'),
	guidInput = document.getElementById('guidInput'),
	guidSubmit = document.getElementById('guidSubmit'),
	guidRegex = /{[\dA-Z]{8}-[\dA-Z]{4}-[\dA-Z]{4}-[\dA-Z]{4}-[\dA-Z]{12}}/g,
	arrow = document.getElementById('arrow'),
	iframe = document.createElement('iframe')

iframe.id = 'iframe'
iframe.frameBorder = 0

function toggleInputBox() {
	inputBox.classList.toggle('show')
	arrow.classList.toggle('down')
}

arrow.addEventListener('click', () => {
	toggleInputBox()
})

guidSubmit.addEventListener('click', () => {
	getGuid()
})

checkForKioskTxt()

function checkForKioskTxt() {
	fs.readFile(kioskTxt, 'utf8', (err, data) => {
		if (err) throw new Error(err)
		let guid = data

		guidInput.placeholder = guid

		if (guid.match(guidRegex)) {
			renderCheckinManager(guid)
		}
	})
}

function renderCheckinManager(guid) {
	iframe.src = `https://client.texnrewards.net/kiosktools/default.asp?guid=${guid}`

	renderTarget.appendChild(iframe)

	writeKioskTxt(guid)
}

function writeKioskTxt(guid) {
	fs.writeFile(kioskTxt, guid, err => {
		if (err) throw new Error(err)
	})
}

function getGuid() {
	let guid = guidInput.value

	if (guid.match(guidRegex)) {
		renderCheckinManager(guid)
		guidInput.classList.remove('error')
	} else {
		guidInput.classList.add('error')
	}
}
