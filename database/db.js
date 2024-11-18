const fs = require('fs').promises;
const path = require('path');

let newData =   {
    materialID: 3,
    materialPO: '80067890',
    oldMaterialPO: '96060-10-6-4',
    description: 'Carbon Pin',
    materialGroup: 'Pin',
    dateCreated: new Date()
}

async function getData() {
    try {
        const data = await fs.readFile('./order_data.json', 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

async function updateAndGetData() {
    try {
        // Write the new data to the file
        await fs.writeFile('./order_data.json', JSON.stringify(newData), 'utf8');

        // Read the updated data
        const data = await fs.readFile('./order_data.json', 'utf8');
        const jsonData = JSON.parse(data);
        return [jsonData];
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}


async function appendData(newData) {
    try {
        // Read the existing data from the JSON file
        const data = await fs.readFile('./order_data.json', 'utf8');
        // Parse the JSON data into a JavaScript object
        const jsonData = JSON.parse(data);
        // Check if a material with the same ID already exists
        const existingMaterial = jsonData.find(material => material.materialID === newData.materialID);

        if (!existingMaterial) {
            // If not found, append the new data
            jsonData.push(newData);
            // Write the updated JSON data back to the file
            await fs.writeFile('./order_data.json', JSON.stringify(jsonData, null, 2), 'utf8');

            console.log('Data appended successfully!');
        } else {
            console.log('Material with ID', newData.materialID, 'already exists.');
        }
    } catch (err) {
        console.error('Error appending data:', err);
    }
}

appendData(newData)
// getData()