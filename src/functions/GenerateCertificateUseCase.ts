import { compile } from 'handlebars';

import { join } from 'path'
import { readFileSync } from 'fs'
import chrome from 'chrome-aws-lambda'

interface ITemplate {
    name: string;
    grade: string;
    id: string;
    medal: string
}
const compileTemplate = (data: ITemplate) => {
    const filePath = join(process.cwd(), 'src', 'templates', 'certificate.hbs')
    const template = readFileSync(filePath, 'utf-8')

    return compile(template)(data)
}

export const handler = async (e) => {
    const { id, name, grade } = e.body

    const medalPath = join(process.cwd(), 'src', 'templates', 'selo.png')

    const medal = readFileSync(medalPath, 'base64')

    const data: ITemplate = {
        name,
        grade,
        id,
        medal
    }


    const content = await compileTemplate(data)
    console.log('content');
    
    const browser = await chrome.puppeteer.launch({
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        userDataDir: '/dev/null',
        
    })
    const page = await browser.newPage()
    await page.setContent(content)
    await page.pdf({
        format: 'a4',
        printBackground: true,
        landscape: true,
        preferCSSPageSize: true,
        path: process.env.IS_OFFLINE ? './certificate.pdf' : null
    })
    await browser.close()

    return {
        statusCode: 200,
        body: JSON.stringify(content)
    }
}