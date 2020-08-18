
export default async (req, res) => {
let data = await fetch('https://my-json-server.typicode.com/wsh-startup/mock-api/tasks')
  .then(response => response.json())
  .then(jsonData => {
    // jsonData is parsed json object received from url 
    return JSON.stringify(jsonData);
  })
  .catch((error) => {
    // handle your errors here
    console.error(error)
  });

  console.log(data);
  res.end(data);
}
