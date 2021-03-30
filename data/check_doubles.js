const fs = require('fs');
const { exec } = require("child_process");



// directory path
const dir = './apis/';

// list all files in the directory
try {
  const files = fs.readdirSync(dir);

  const descriptions = []
  const urls = []

  // files object contains all files names
  // log them on console
  files.forEach(file => {
    fs.readFile(dir + file, 'utf-8', function (err, content) {
      if (err) {
        console.error(err)
        return;
      }
      const json = JSON.parse(content)
      const apiUrl = json.environments[0].api_url.trim()

      if (urls.map(u => u.apiUrl).includes(apiUrl)) {
        const prev = urls.find(u => u.apiUrl === apiUrl)
        console.log('❌', file, '--->', prev.file, `\n${apiUrl}\n`)
      }

      urls.push({apiUrl, file})

      if (!!json.description && descriptions.map(f => f.description.toLowerCase()).includes(json.description.toLowerCase())) {

        if (json.description !== "-" || json.description.toLowerCase() !== "onbekend") {
          return;
        }

        const prev = descriptions.find(f => f.description === json.description)
        console.log('❌', file, '--->', prev.file, `\n:${json.description.toLowerCase()}:\n`)

        const cmd = `git --no-pager log --decorate=short -n1 --follow -p -- "${dir + file}" | grep Author`
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          if (stdout.includes("ramsydevos@saxum.nl")) {
            const path = dir + file


            try {
              fs.unlinkSync(path)
              console.log(`🗑: ${file} (${stdout}`);
              //file removed
            } catch (err) {
              console.error(err)
            }
          }
        });
        return;
      }

      descriptions.push({ file, description: json.description })
      // console.log('✅', file)
    });
  });
  console.log('no doubles')

} catch (err) {
  console.log(err);
}