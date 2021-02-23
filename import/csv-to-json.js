const csv = require('csv-parser')
const fs = require('fs')
const results = [];
var slugify = require('slugify')
const fetch = require('node-fetch');

const parse = (props) => {

  const {
    api_authentication = "unknown",
    api_type = "rest_json",
    api_url,
    contact_email,
    contact_url,
    description,
    documentation_url,
    organization_name,
    service_name,
    specification_url,
    tags = [],
  } = props;

  return {
    "description": description,
    "organization_name": organization_name,
    "service_name": service_name,
    "api_type": api_type,
    "api_authentication": api_authentication,
    "tags": tags,
    "environments": [{
        "name": "production",
        "api_url": api_url,
        "specification_url": specification_url,
        "documentation_url": documentation_url
    }],
    "contact": {
        "email": contact_email,
        "url": contact_url
    },
    "is_reference_implementation": false,
    "terms_of_use": {
      "government_only": false,
      "pay_per_use": false
    }
  }
}

const queryCor = async (name) => fetch(`https://portaal.digikoppeling.nl/registers/api/v1/organisaties?zoek=${name}`)
  .then(r => r.json())

const readFiles = (args) => {
  const [,,filename] = args

  if (!filename) {
    throw new Error('missing filename')
  }

  fs.createReadStream(filename)
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => {

    results.push(parse({
      api_url: data["URL"],
      description: data["Beschrijving"],
      documentation_url: data["Link"],
      organization_name: data["Organisatie"],
      service_name: data["Naam"],
      tags: ["imported"],
    }))

  })
  .on('end', () => {
    const validResults = results.filter(r => r.environments[0].api_url !== "Geen")

    validResults.forEach(result => {
      const fileName = slugify(result.organization_name + ' ' + result.service_name).toLowerCase();
      console.log(fileName)

      let data = JSON.stringify(result, undefined, 2);
      fs.writeFileSync(`./json/${fileName}.json`, data);
    })
  });
}

readFiles(process.argv)