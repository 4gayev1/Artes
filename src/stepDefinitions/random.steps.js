const { Given, context, random, expect, extractVarsFromResponse } = require("../helper/imports/commons");

Given("User sets random words as {string} variable", async (key) => {
    const words = random.lorem.words({min:2, max: 5})
    context.vars[key] = words;
});

Given("User sets random number from {int} to {int} as {string} variable", async (from, to, key) => {
    const number = random.number.int({min: from, max: to});
    context.vars[key] = number;
});

Given('User sends GET request to {string} and save {string} variable as a {string} randomly', async (api, varName, variableKey) => {
    const res = await fetch(api)
    const body = await res.json();
    const randomContent = body.content[random.number.int({ min: 0, max: body.content.length - 1 })];
    context.vars[variableKey] = randomContent[varName];    
})

Given('User expects that response has {string} field with {string} value', async (field, value) => {
    extractVarsFromResponse(field, field);

    expect(context.vars[field]).toBe(value);
})