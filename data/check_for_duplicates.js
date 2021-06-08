const fs = require('fs')
const { exec } = require("child_process")

const dir = './apis/'

// list all files in the directory
const files = fs.readdirSync(dir)

const descriptions = []
const urls = []

files.forEach(file => {
  fs.readFile(dir + file, 'utf-8', function (err, content) {

    const json = JSON.parse(content)
    const apiUrl = json.environments[0].api_url.trim()

    if (urls.map(u => u.apiUrl).includes(apiUrl)) {
      const prev = urls.find(u => u.apiUrl === apiUrl)
      if (prev.file.includes(file)) {
        console.log('❌ duplicate URL', file, '--->', prev.file)
        fs.unlinkSync(dir + file)
      }
    }

    urls.push({ apiUrl, file })


  })
})