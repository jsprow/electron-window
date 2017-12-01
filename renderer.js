const { ipcRenderer, remote } = require('electron')

const iframe = document.createElement('iframe')

iframe.id = 'iframe'
iframe.frameBorder = 0

let startUrl = `https://client.texnrewards.net/kiosktools/default.asp?guid={4BF1193C-F491-4E1A-8C99-24D551023F9C}&w=1624&h=965`

const renderCheckinManager = () => {
	iframe.src = startUrl

	renderTarget.appendChild(iframe)
}

renderCheckinManager()
